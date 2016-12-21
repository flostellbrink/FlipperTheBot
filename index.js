'use strict'

var express = require('express');
var app     = express();
app.set('port', (process.env.PORT || 5000));

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('319892880:AAF6oY-0KsysbDAbaZbpm_nUf2kUME3zHqU')

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

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
