const express = require('express');
const { Telegraf } = require('telegraf');
const { searchMessages } = require('./helpers');

const app = express();
const bot = new Telegraf('7349305284:AAG_ZoTGSYdXLOlBa-MXVlnCtvygIvvgpNI'); // ضع هنا توكن البوت الخاص بك

// قائمة القنوات والجروبات
const channels = [
  'https://t.me/heartfelt_help',
  'https://t.me/jobforallMoOo',
  'https://t.me/Ahmedchemesa',
  'https://t.me/Zra3Awy',
  'https://t.me/RepsologyFamily',
  'https://t.me/letsgrowgroup',
  'https://t.me/+EafQF5AiUgZkOWVk',
  'https://t.me/jops2015',
  'https://t.me/QHSEjobs',
  'https://t.me/scholarjobs1',
  'https://t.me/veterinaryjobsss',
  'https://t.me/engob_eg',
  'https://t.me/JobOppOrtUnitieSSS',
  'https://t.me/Asmavet',
  'https://t.me/joinchat/MjV85yAgDhAyYmZk',
  'https://t.me/pharmacist_chemist',
  'https://t.me/jobseg',
  'https://t.me/Alborg2022',
];

// واجهة المستخدم
app.use(express.static('public'));

// API للبحث
app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'الكلمة المطلوبة غير موجودة' });
  }

  try {
    const results = await searchMessages(bot, channels, query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'حدث خطأ أثناء البحث' });
  }
});

// تعامل مع الأخطاء
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// بدء التطبيق
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
