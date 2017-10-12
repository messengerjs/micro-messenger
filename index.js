const { json, send } = require('micro')
const MessengerCore = require('messenger-core')

module.exports = function MicroMessenger () {
  const messengerCore = MessengerCore()
  let nextHandler = null

  async function microMessenger (req, res) {
    let didHandle = false
    try {
      const body = await json(req)
      didHandle = await messengerCore(body)
    } catch (error) {
      // JSON could not be parsed, so it's not a message for us
    }

    if (didHandle || !nextHandler) {
      send(res, 200)
      return
    }

    return nextHandler (req, res)
  }

  microMessenger.else = function (handler) {
    nextHandler = handler
    return microMessenger
  }

  microMessenger.use = function (plugin) {
    messengerCore.use(plugin)
    return microMessenger
  }

  return microMessenger
}
