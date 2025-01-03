async function searchMessages(bot, channels, query) {
  const results = [];
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  for (const channel of channels) {
    const updates = await bot.telegram.getChatHistory(channel, { limit: 100 });
    for (const message of updates) {
      if (
        message.date * 1000 >= sevenDaysAgo &&
        containsJobKeywords(message.text) &&
        containsContactInfo(message.text) &&
        message.text.includes(query)
      ) {
        let cleanMessage = cleanMessageText(message.text);
        results.push(cleanMessage);
        if (results.length >= 100) break;
      }
    }
    if (results.length >= 100) break;
  }

  return results;
}

function containsJobKeywords(text) {
  const keywords = [
    'مطلوب', 'تطلب للتعيين', 'Join Our Team', 'We are hiring',
    'looking for', 'Required', 'Urgent Hiring', 'Hiring',
  ];
  return keywords.some(keyword => text.includes(keyword));
}

function containsContactInfo(text) {
  const phoneRegex = /\b\d{10,15}\b/;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  return phoneRegex.test(text) || emailRegex.test(text);
}

function cleanMessageText(text) {
  return text
    .replace(/#[^\s]+/g, '') // إزالة الهشتاج
    .replace(/https?:\/\/[^\s]+/g, ''); // إزالة الروابط
}

module.exports = { searchMessages };
