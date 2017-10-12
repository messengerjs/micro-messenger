![Build Status](https://img.shields.io/travis/AndreasPizsa/micro-messenger.svg?style=flat-square) ![Coverage](https://img.shields.io/codecov/c/github/AndreasPizsa/micro-messenger.svg?style=flat-square) [![NPM version](https://img.shields.io/npm/v/micro-messenger.svg?style=flat-square)](https://npmjs.org/package/messenger-core) [![Greenkeeper badge](https://badges.greenkeeper.io/AndreasPizsa/micro-messenger.svg)](https://greenkeeper.io/)

# micro-messenger

> Run your Facebook Messenger bot on Micro

<img src="https://raw.githubusercontent.com/zeit/art/6451bc300e00312d970527274f316f9b2c07a27e/micro/logo.png" height="16"/>



## Installation

```sh
$ npm install --save micro-messenger
```

## Usage

```js
module.exports = require('micro-messenger')()
  .use(

    // add `messenger-core` plugins
    // and/or your own:

    async (message, context) => {
      if (context.topic === 'postback.GET_STARTED') {

        // do things you want to do upon a GET_STARTED postback

      }
    }

  )
  .else(async (req, res) => {

    // do other amazing webhook things

  })

```

## License

MIT © [Andreas Pizsa](https://github.com/AndreasPizsa)
