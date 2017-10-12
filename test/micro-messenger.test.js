const listen  = require('test-listen')
const micro   = require('micro')
const request = require('got')
const sinon   = require('sinon')
const test    = require('ava')

const MicroMessenger = require('../')

test('it will handle messenger-core plugins', async t => {
  const plugin = sinon.spy()
  const microMessenger = MicroMessenger()
  const service = micro(microMessenger.use(plugin))
  const url = await listen(service)
  await request.post(url, {
    json: true,
    body: FIXTURE
  })
  t.true(plugin.calledOnce)
  service.close()
})

test('it will always return 200 if there\'s no `else`', async t => {
  const microMessenger = MicroMessenger()
  const service = micro(microMessenger)
  const url = await listen(service)
  await request.post(url)
  service.close()
  t.pass()
})

test('it will call the `else` handler if one is provided', async t => {
  const EXPECTED = 'Yay'
  const microMessenger = MicroMessenger()
  const service = micro(microMessenger.else(async (req, res) => EXPECTED))
  const url = await listen(service)
  const { body } = await request.post(url)
  service.close()
  t.is(body, EXPECTED)
})

const FIXTURE = {
  object: 'page',
  entry: [{
    messaging: [{
      'sender':{
        'id':'<PSID>'
      },
      'recipient':{
        'id':'<PAGE_ID>'
      },
      'timestamp':1458692752478,
      'message':{
        'mid':'mid.1457764197618:41d102a3e1ae206a38',
        'text':'hello, world!',
        'quick_reply': {
          'payload': '<DEVELOPER_DEFINED_PAYLOAD>'
        }
      }
    }]
  }]
}
