const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const SESSION_DIR = '.wwebjs_auth';

// 🔹 Controllo parametro --reset
if (process.argv.includes('--reset')) {
    if (fs.existsSync(SESSION_DIR)) {
        fs.rmSync(SESSION_DIR, { recursive: true, force: true });
        console.log('🗑️  Sessione cancellata. Verrà richiesto un nuovo QR al prossimo avvio.');
    } else {
        console.log('ℹ️ Nessuna sessione trovata da cancellare.');
    }
 process.exit(0); // 🔹 Ferma subito il bot dopo il reset
}

// Express API
const app = express();
app.use(bodyParser.json());

// Inizializza client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// QR solo se non c’è sessione
client.on('qr', qr => {
    console.log('📲 Scansiona questo QR code:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot pronto e connesso!');
});

// API per inviare messaggi
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ status: 'error', error: 'Numero e messaggio richiesti' });
    }

    try {
        const chatId = number + '@c.us';
        await client.sendMessage(chatId, message);
        return res.json({ status: 'success', number, message });
    } catch (err) {
        console.error('Errore invio:', err);
        return res.status(500).json({ status: 'error', error: err.toString() });
    }
});

// Avvio server REST
app.listen(3000, () => {
    console.log('🚀 API REST avviata su http://localhost:3000');
});

// Inizializza WhatsApp client
client.initialize();

