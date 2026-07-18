import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.js';

const app = express();

// Connexion base de données
connectDB();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => res.send('Ever After Events API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));