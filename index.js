'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('319892880:AAF6oY-0KsysbDAbaZbpm_nUf2kUME3zHqU',
    {
        webAdmin: {
            port: process.env.PORT || 5000,
            host: 'localhost'
        }
    }
)

function printCommands($) {
    $.sendMessage('/toss - Tosses a coin')
}

class StartController extends TelegramBaseController {
    startHandler($) {
        $.sendMessage('Welcome to owl nation! Have a look at the available commands:')
        printCommands($)
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
