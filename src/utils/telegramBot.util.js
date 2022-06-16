const TelegramBot = require('node-telegram-bot-api');

const token = process.env.telegramBotToken
const botId = process.env.telegramBotChannelId

const bot = new TelegramBot(token, {polling: true});

/** Get any message and send */
const telegramSendMsg = (msg) => {
  bot.sendMessage(botId, msg);
}

/** Generate randoms verify code then 
 * create the message form and 
 * sent msg by function sendMsg */
const getAuthCodeVerify = (email) => {
  try{
    //generate verify code
    const min = 1000
    const max = 10000
    const code = Math.floor(Math.random() * (max - min) + min)
    //create message to sent to telegram
    const msg = `- Email: ${email.email}\n- Code: ${code}`
    telegramSendMsg(msg)
    return {
      Status: "200",
      Code: code
    }
  }catch(e){
    return{
      status: "",
      Error: e.message
    }
  }
}

module.exports = {
  telegramSendMsg,
  getAuthCodeVerify
}
