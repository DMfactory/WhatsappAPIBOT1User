Requisiti:

1️⃣ Sistema operativo

Linux (Ubuntu, Debian, CentOS) oppure macOS/Windows.

Consigliato Ubuntu 22.04 o 24.04 se stai usando Linux.

2️⃣ Node.js

Versione >=18.x (es. 18.19.1).

Assicurati di avere npm installato (npm -v).

Controlla con:

node -v
npm -v

3️⃣ Librerie Node.js

Dal terminale, nella cartella del progetto, esegui:

npm init -y
npm install whatsapp-web.js express body-parser qrcode


whatsapp-web.js → libreria principale per controllare WhatsApp.

express → per creare le API REST.

body-parser → per leggere i dati JSON nei POST.

4️⃣ Puppeteer / Chromium

whatsapp-web.js usa Puppeteer per aprire WhatsApp Web.
Devi installare le dipendenze di sistema necessarie a Chromium:

sudo apt update
sudo apt install -y wget gnupg2 ca-certificates \
    fonts-liberation libappindicator3-1 libasound2 libatk-1.0-0 \
    libcups2 libdbus-1-3 libgconf-2-4 libgtk-3-0 libnspr4 \
    libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
    xdg-utils


Se sei su root, ricordati di usare --no-sandbox nei parametri Puppeteer (già incluso nel codice).

Funzionalità:

--reset dopo il nome del file resetta la sessione di whatsapp

