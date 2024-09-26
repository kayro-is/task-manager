import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();  // Charger les variables d'environnement

const app = express();
app.use(express.json());  // Permet de lire le body des requêtes en JSON

// Utilisation des routes d'authentification
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
