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
    } else if ( _messegeText === "курс" ) {
        request("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5", function (error, response, body) {
            if ( !error && response.statusCode === 200 ) {
                const data = JSON.parse(body);
                data.forEach(function(value, index){
                    bot.sendMessage(id, (`
Валюта: ${value.ccy} 
Код национальной валюты: ${value.base_ccy}  
Покупка национальной валюты: ${value.buy}`))
                });
            }
        })
    } else if ( _messegeText === "трек" ) {
        const file = __dirname + "/src/audio/MULTIPLEXES - MARINO WRAITH Ft. Smug$ (Prod. OgGeo).mp3"
        bot.sendAudio(id, file)
    } else { bot.sendMessage(id, `${_User} я умею только малость, но скоро я научусь. Напиши (Трек) и я кину тебе трек дня. Напиши (Курс) и я прикину по чем тебе поменяют заработную плату`) }
});