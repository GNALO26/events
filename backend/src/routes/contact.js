import { Router } from 'express';
import Lead from '../models/Lead.js';
import { sendInternalNotification, sendClientConfirmation } from '../config/email.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { nom, email, dateMariage, styleRecherche, message } = req.body;

    if (!nom || !email) {
      return res.status(400).json({ error: 'Nom et email sont requis.' });
    }

    const lead = new Lead({ nom, email, dateMariage, styleRecherche, message });
    await lead.save();

    // Envoyer les emails en parallèle (ne pas bloquer la réponse)
    Promise.all([
      sendInternalNotification({ nom, email, dateMariage, styleRecherche, message }),
      sendClientConfirmation({ nom, email }),
    ]).catch((err) => console.error('Erreur envoi email :', err));

    res.status(201).json({ success: true, message: 'Demande enregistrée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

export default router;