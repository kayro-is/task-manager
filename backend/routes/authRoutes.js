import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

// Route pour demander la réinitialisation du mot de passe
router.post('/forgot-password', forgotPassword);

// Route pour réinitialiser le mot de passe via le token
router.post('/reset-password/:token', resetPassword);

export default router;
