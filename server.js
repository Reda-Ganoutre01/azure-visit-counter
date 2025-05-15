const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const counterFile = path.join(__dirname, 'counter.json');

// Fonction pour lire le compteur depuis le fichier
function readCounter() {
  try {
    const data = fs.readFileSync(counterFile, 'utf8');
    return JSON.parse(data).count || 0;
  } catch (err) {
    return 0; // Par défaut, 0 si le fichier n’existe pas
  }
}

// Fonction pour sauvegarder le compteur dans le fichier
function saveCounter(count) {
  fs.writeFileSync(counterFile, JSON.stringify({ count }), 'utf8');
}

let visitCount = readCounter();
const serverName = os.hostname();

app.get('/', (req, res) => {
  visitCount++;
  saveCounter(visitCount);
  res.send(`
    <h1>Welcome to the Visit Counter App!</h1>
    <p>Visitor count: ${visitCount} <br> Nom du serveur : ${serverName} </p>
  `);
});



app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
