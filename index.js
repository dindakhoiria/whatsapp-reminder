require('dotenv').config();
const twilio = require('twilio');
const schedule = require('node-schedule');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const myNumber = process.env.MY_WHATSAPP_NUMBER;
const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;

// Fungsi untuk mengirim pesan WhatsApp
const sendMessage = (message) => {
    client.messages.create({
        from: twilioNumber,
        to: myNumber,
        body: message
    }).then(msg => console.log(`Pesan terkirim: ${msg.sid}`))
      .catch(err => console.error(`Gagal kirim: ${err.message}`));
};

// Jadwal pengiriman pesan jam 17:00 (Persiapan Soal)
schedule.scheduleJob('0 17 * * *', () => {
    sendMessage("⏰ Saatnya menyiapkan soal diskusi dan tugas! Jangan lupa persiapkan materi.");
});

// Jadwal pengiriman pesan jam 19:00 (Mulai Kerja Tugas)
schedule.scheduleJob('15 17 * * *', () => {
    sendMessage("📚 Waktunya mengerjakan tugas dan diskusi! Tetap semangat 💪");
});

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('WhatsApp Reminder Bot is active!');
});

app.listen(port, () => {
  console.log(`🌐 Server is running on port ${port}`);
});

console.log("✅ ENV Loaded:", {
    MY: process.env.MY_WHATSAPP_NUMBER,
    TWILIO: process.env.TWILIO_WHATSAPP_NUMBER
  });