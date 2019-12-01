'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram(process.env.telegramToken, {
    webhook: {
        url: process.env.publicUrl,
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    }
})

function getCommands() {
    return '/start - Show commands\n'
        + '/flip - Flips a coin'
}

class StartController extends TelegramBaseController {
    startHandler($) {
        $.sendMessage(
            'Welcome! Have a look at the available commands:\n\n'
            + getCommands())
    }

    get routes() {
        return {
            'startCommand': 'startHandler'
        }
    }
}

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails'
}

class RandomController extends TelegramBaseController {
    flipHandler($) {
        const result = coinFlip();
        $.sendPhoto({ path: `res/${result}.png` })
        $.sendMessage(`Flipping a coin. Its ${result}!`)
    }

    get routes() {
        return {
            'flipCommand': 'flipHandler'
        }
    }
}

tg.router
    .when(new TextCommand('/start', 'startCommand'), new StartController())
    .when(new TextCommand('/flip', 'flipCommand'), new RandomController())
