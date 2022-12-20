const { Telegraf } = require("telegraf");
const { dbAll } = require("../database/database");

tgSendMessage = async (text) => {
  const tgBotTokenQuery = await dbAll(
    `SELECT value FROM config  WHERE  key is 'tg_token'`
  );
  const tgUserIdQuery = await dbAll(
    `SELECT value FROM config  WHERE  key is 'tg_user_id'`
  );

  const tgBotToken = tgBotTokenQuery[0].value;
  const tgUserId = tgUserIdQuery[0].value;

  const bot = new Telegraf(tgBotToken);

  await bot.telegram.sendMessage(tgUserId, text, {
    parse_mode: "MarkdownV2",
  });
};

tgTestConfigure = async (token, userId, text) => {
  const testBot = new Telegraf(token);

  let botObject = {};
  try {
    botObject = { ...(await testBot.telegram.getMe()) };
  } catch (err) {
    if (!botObject.id) {
      return "Invalid telegram bot api key";
    }
  }

  try {
    await testBot.telegram.sendMessage(userId, text, {
      parse_mode: "MarkdownV2",
    });
    return "Auth code sent";
  } catch (err) {
    return "Chat not found (wrong user id)";
  }
};

module.exports = { tgSendMessage, tgTestConfigure };
