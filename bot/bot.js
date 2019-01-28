const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require("fs");
const token = '616555291:AAFRhUahXNZL1QGolpDMeRBabSmLt2_41jE'; 
const bot = new TelegramBot(token, {polling: true});

bot.on("message", (msg) => { 
    const id = msg.from.id,
    messegeText = msg.text,
    _User = msg.from.username,
    _messegeText = messegeText.toLowerCase();
    
    if ( _messegeText === "привет" ) {
        bot.sendMessage(id, "Привет мой маленький " + _User)
    } 

    const __currencies = "Now currencies";
        if ( msg.text.indexOf(__currencies) === 0 ) {
            request("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5", function (error, response, body) {
                if ( !error && response.statusCode === 200 ) {
                    const data = JSON.parse(body);
                    data.forEach(function(value, index){
                        bot.sendMessage(msg.from.id, (`
Валюта: ${value.ccy} 
Код национальной валюты: ${value.base_ccy}  
Покупка национальной валюты: ${value.buy}`))
                    });
                }
            })
        } 

    const __location = "Your Location";
    if (msg.text.indexOf(__location) === 0) {
        bot.sendLocation(id, 46.971862, 31.967364);
        bot.sendMessage(id, "Это предварительно ваше месте положение");
    }

    const __track = "Send Track";
    if ( msg.text.indexOf(__track) === 0 ) {
        const file = __dirname + "/src/audio/MULTIPLEXES - MARINO WRAITH Ft. Smug$ (Prod. OgGeo).mp3"
        bot.sendAudio(id, file)
    } 

    var what = "/start";
        if (msg.text.includes(what)) {
        bot.kickChatMember(msg.chat.id,  msg.from.id);
    }    

});


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.from.id, "Привет, я lowRight BOT!", {
        "reply_markup" : {
            "keyboard" : [
                ["Your Location", "Now currencies"], 
                ["Send Track", "I'm robot-hobot"], 
            ]
        }
    });
});
