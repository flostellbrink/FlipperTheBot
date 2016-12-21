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
    return '/start - Show commands\n\n'
        + '/toss - Tosses a coin'
}

class StartController extends TelegramBaseController {
    startHandler($) {
        $.sendMessage(
            'Welcome to owl nation! Have a look at the available commands:\n'
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

    tossHandler($) {
        $.sendMessage('Tossing a coin. Its ' + coinFlip() + '!')
    }

    get routes() {
        return {
            'tossCommand': 'tossHandler'
        }
    }
}

tg.router
    .when(new TextCommand('/start', 'startCommand'), new StartController())
    .when(new TextCommand('/toss', 'tossCommand'), new RandomController())
