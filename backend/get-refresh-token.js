import 'dotenv/config';
import express from 'express';
import { google } from 'googleapis';
import open from 'open'; // npm install open (pratique mais optionnel)

const app = express();
const PORT = 3000;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
);

// Générer l'URL d'autorisation
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',       // INDISPENSABLE pour obtenir un refresh token
  scope: ['https://mail.google.com/'],
  prompt: 'consent',            // Force un nouveau refresh token
});

console.log('➡️  Autorisez l\'application en ouvrant cette URL dans votre navigateur :\n');
console.log(authUrl + '\n');

// Optionnel : ouvrir automatiquement le navigateur
try {
  await open(authUrl);
} catch (_) {}

// Route de callback
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).send('Code manquant.');
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\n✅ Rafraîchissez votre refresh token :\n');
    console.log('➡️  GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
    console.log('\n📋 Copiez cette ligne dans votre fichier .env');
    res.send('Succès ! Vous pouvez fermer cette fenêtre et revenir au terminal.');
    process.exit(0);
  } catch (err) {
    console.error('Erreur lors de l’échange du code :', err);
    res.status(500).send('Erreur d’authentification');
    process.exit(1);
  }
});

app.listen(PORT, () => {
  console.log(`🟢 Serveur d’authentification en écoute sur http://localhost:${PORT}`);
  console.log('🔒 Une fois le token récupéré, le serveur s’arrêtera automatiquement.');
});