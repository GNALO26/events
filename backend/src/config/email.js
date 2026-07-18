import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const createTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GOOGLE_USER_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  return transporter;
};

export const sendInternalNotification = async (leadData) => {
  const transporter = await createTransporter();
  const mailOptions = {
    from: `"Ever After Events" <${process.env.GOOGLE_USER_EMAIL}>`,
    to: process.env.GOOGLE_USER_EMAIL,
    subject: `Nouveau lead : ${leadData.nom}`,
    html: `
      <h1 style="font-family: Georgia, serif; color: #1A1A1A;">Nouvelle demande de contact</h1>
      <table style="font-family: Arial, sans-serif; color: #333; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Nom :</td><td style="padding: 8px;">${leadData.nom}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email :</td><td style="padding: 8px;">${leadData.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Date du mariage :</td><td style="padding: 8px;">${leadData.dateMariage}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Style recherché :</td><td style="padding: 8px;">${leadData.styleRecherche}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Message :</td><td style="padding: 8px;">${leadData.message}</td></tr>
      </table>
    `,
  };
  await transporter.sendMail(mailOptions);
};

export const sendClientConfirmation = async (leadData) => {
  const transporter = await createTransporter();
  const mailOptions = {
    from: `"Ever After Events" <${process.env.GOOGLE_USER_EMAIL}>`,
    to: leadData.email,
    subject: 'Merci de nous avoir contactés, ' + leadData.nom.split(' ')[0],
    html: `
      <div style="max-width: 600px; margin: auto; background: #FAFAFA; padding: 30px; font-family: 'Inter', Arial, sans-serif; color: #1A1A1A;">
        <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #D4AF37; text-align: center;">Ever After Events</h1>
        <p style="font-size: 16px;">Cher(e) ${leadData.nom},</p>
        <p>Nous avons bien reçu votre demande et vous remercions de l'intérêt que vous portez à notre agence.</p>
        <p>Notre équipe étudie votre projet avec la plus grande attention et vous répondra sous 48 heures.</p>
        <p style="font-style: italic;">"L'excellence dans chaque détail."</p>
        <hr style="border: none; border-top: 1px solid #D4AF37; margin: 20px 0;" />
        <p style="font-size: 12px; color: #555;">Ceci est un email automatique, merci de ne pas y répondre directement.</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};