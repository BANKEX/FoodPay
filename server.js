const Telegraf = require('telegraf'),
    Extra = require('telegraf/extra'),
    Markup = require('telegraf/markup'),
    QRDecoder = require('./qrscanner.js'),
    rp = require('request-promise'),
    https = require('https'),
    fs = require('fs'),
    aes = require('./aes.js'),
    Ethereum = require('./ethereum.js'),
    Contract = require('./multiToken.js'),
    Exchange = require('./exchange.js'),
    db = require('./db.js');

const token = process.env.BOT_TOKEN

const bot = new Telegraf(token)
const Telegram = new Telegraf.Telegram(token)

bot.use(Telegraf.log())

bot.start(({
    reply
}) => {
    return reply('Приветствую тебя, участник Proof of Skill хакатона!', Markup
        .keyboard([
            ['Баланс'],
            ['Цены'],
            ['Перевод'],
            ['Помощь'],
        ])
        .resize()
        .extra()
    )
})

function showTokenBalances(ctx, address) {
    getTokenBalances(ctx, address, (balances) => {
        ctx.reply(
            'Номер токена 1 (Food Token) ' + balances[0] + '\n' +
            'Номер токена 2 (Thing Token): ' + balances[1] + '\n'
            // 'Token Soylent: ' + balances[2] + '\n'
            // 'Токен 4: ' + balances[3] + '\n' +
            // 'Токен 5: ' + balances[4] + '\n' +
            // 'Токен 6: ' + balances[5] + '\n' +
            // 'Токен 7: ' + balances[6] + '\n' +
            // 'Токен 8: ' + balances[7] + '\n' +
            // 'Токен 9: ' + balances[8] + '\n' +
            // 'Токен 10: ' + balances[9] + '\n' +
            // 'Токен 11: ' + balances[10] + '\n' +
            // 'Токен 12: ' + balances[11] + '\n' +
            // 'Токен 13: ' + balances[12] + '\n' +
            // 'Токен 14: ' + balances[13] + '\n' +
            // 'Токен 15: ' + balances[14] + '\n' +
            // 'Токен 16: ' + balances[15] + '\n' +
            // 'Токен 17: ' + balances[16] + '\n' +
            // 'Токен 18: ' + balances[17] + '\n' +
            // 'Токен 19: ' + balances[18] + '\n' +
            // 'Токен 20: ' + balances[19] + '\n'
        );
    });
}

bot.hears(/Баланс/i, (ctx) => {
    db.customer.find.byUserID(ctx.message.from.id, (err, user) => {
        if (user) {
            let address = aes.decryptAddress(String(user.encryptedAddress), "123");
            showTokenBalances(ctx, address);
        } else {
            ctx.reply('Отправь мне свой QR Code');
            /**
             * Save file with QR code, get data from QR code, delete file
             */
            bot.on(['photo'], (ctx) => {
                Telegram.getFile(ctx.message.photo[ctx.message.photo.length - 1].file_id).then((obj) => {
                    let file_path = String(obj.file_path).substring(7);
                    console.log(file_path)
                    var file = fs.createWriteStream(file_path).on('finish', () => {
                        QRDecoder.decodeQRCode(file_path, (err, res) => {
                            if (err) {
                                ctx.reply('Ваш QR код не разобрать');
                                let filePath = __dirname + "/" + file_path;
                                fs.unlinkSync(filePath);
                                return;
                            }

                            let address = aes.decryptAddress(String(res), "123");

                            if (Ethereum.isAddress(address)) {
                                showTokenBalances(ctx, address);
                                db.customer.create(ctx.message.from.id, ctx.message.from.username, res, (err, doc) => {});
                            } else {
                                ctx.reply('Ваш QR код не разобрать');
                            }

                            let filePath = __dirname + "/" + file_path;
                            fs.unlinkSync(filePath);
                        });
                    });
                    var request = https.get("https://api.telegram.org/file/bot" + token + "/" + obj.file_path, function (response) {
                        response.pipe(file);
                    })
                });
            });
        }
    })
});

async function getTokenBalances(ctx, address, callback) {
    function getAllowance(ctx, g, address) {
        return new Promise((resolve, reject) => {
            console.log(address)
            console.log(g)
            Contract.allowance(g, '0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433', address, (err, balance) => {
                if (err) {
                    console.log(err)
                    ctx.reply('Ooops. Что-то пошло не так..');
                    return;
                    resolve(err);
                }

                resolve(balance);
            });
        });
    }

    var tokenBalance1 = getAllowance(ctx, 1, address);
    var tokenBalance2 = getAllowance(ctx, 2, address);
    // var tokenBalance3 = getAllowance(ctx, 3, address);
    // var tokenBalance4 = getAllowance(ctx, 4, address);
    // var tokenBalance5 = getAllowance(ctx, 5, address);
    // var tokenBalance6 = getAllowance(ctx, 6, address);
    // var tokenBalance7 = getAllowance(ctx, 7, address);
    // var tokenBalance8 = getAllowance(ctx, 8, address);
    // var tokenBalance9 = getAllowance(ctx, 9, address);
    // var tokenBalance10 = getAllowance(ctx, 10, address);
    // var tokenBalance11 = getAllowance(ctx, 11, address);
    // var tokenBalance12 = getAllowance(ctx, 12, address);
    // var tokenBalance13 = getAllowance(ctx, 13, address);
    // var tokenBalance14 = getAllowance(ctx, 14, address);
    // var tokenBalance15 = getAllowance(ctx, 15, address);
    // var tokenBalance16 = getAllowance(ctx, 16, address);
    // var tokenBalance17 = getAllowance(ctx, 17, address);
    // var tokenBalance18 = getAllowance(ctx, 18, address);
    // var tokenBalance19 = getAllowance(ctx, 19, address);
    // var tokenBalance20 = getAllowance(ctx, 20, address);

    var balances = await Promise.all([
        tokenBalance1,
        tokenBalance2,
        // tokenBalance3,
        // tokenBalance4,
        // tokenBalance5,
        // tokenBalance6,
        // tokenBalance7,
        // tokenBalance8,
        // tokenBalance9,
        // tokenBalance10,
        // tokenBalance11,
        // tokenBalance12,
        // tokenBalance13,
        // tokenBalance14,
        // tokenBalance15,
        // tokenBalance16,
        // tokenBalance17,
        // tokenBalance18,
        // tokenBalance19,
        // tokenBalance20
    ]);
    console.log(balances)
    callback(balances);
}

bot.hears(/Помощь/i, ({
    reply
}) => {
    return reply('Что вас интересует?', Markup
        .keyboard([
            ['Как добраться до места?'],
            ['Во сколько?'],
            ['Кому можно задать свои вопросы?'],
            ['Главное меню'],
        ])
        .resize()
        .extra()
    )
})

let exchange_01 = false;


bot.hears(/Перевод/i, (ctx) => {
    let tokenNum;
    let recieverName;
    let value;


    ctx.reply('Введите номер токена (1 или 2)');
    exchange_01 = true;

    bot.on('text', async (ctx1) => {
        if (!tokenNum) {
            tokenNum = ctx1.message.text;
            ctx.reply('Введите nickname получателя');
            await setTimeout(()=>{},3000)
        } else if (!recieverName) {
            if (String(ctx1.message.text).substring(0, 1) == "@") {
                recieverName = ctx1.message.text.substring(1, (ctx1.message.text).length)
            } else {
                recieverName = ctx1.message.text;
            }
            console.log(recieverName)
            ctx.reply('Введите отправляемое значение');
            await setTimeout(()=>{},3000)
        } else if (!value) {
            value = ctx1.message.text;
            ctx.reply('Ожидайте..');
            Exchange.exchange(ctx1.message.from.id, recieverName, tokenNum, value, (err, doc) => {
                if (err) {
                    ctx1.reply("Вы ввели некорректные данные или человек ещё не проверял свой баланс");
                } else if (doc.substring(0, 2) == '0x') {
                    ctx1.reply("Перевод подтвердится примерно через минуту");
                } else {
                    ctx1.reply("Повторите перевод через минуту");
                }
            });
            tokenNum = null;
            recieverName = null;
            value = null;
            await setTimeout(()=>{},3000)
            return;
        }
    });
})

bot.hears(/Цены/i, (ctx) => {
    ctx.reply("Octa: 2 Food Token\nSuper Food: 2 Food Token\nSoylent: 4 Food Token\nRedBull: 1 Food Token\n\nBottle: 2 Thing Token\nT-shirt: 2 Thing Token\nSleeping Kit: 1 Thing Token");
});


bot.hears(/Как добраться до места/i, (ctx) => ctx.reply('Коворкинг находится по адресу Ленинский проспект 30 А, метро Ленинский проспект.\n\nПосмотреть карту можно здесь: http://coworkstation.ru/park'))
bot.hears(/Во сколько/i, (ctx) => ctx.reply('Мероприятие начнется 19 мая в 9:00 с регистрации участников'))
bot.hears(/Кому можно задать свои вопросы/i, (ctx) => ctx.reply('PR-менеджер мероприятия @gulyaevaa , event-менеджер @nastya_belyakova'))

bot.hears(/Главное меню/i, ({
    reply
}) => {
    return reply('Приветствую тебя, участник Proof of Skill хакатона!', Markup
        .keyboard([
            ['Баланс'],
            ['Цены'],
            ['Перевод'],
            ['Помощь'],
        ])
        .resize()
        .extra()
    )
})

bot.catch((err) => {
    console.log('Ooops', err)
    ctx.reply('Ooops');
})

bot.startPolling()