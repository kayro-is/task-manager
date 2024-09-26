import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Op } from 'sequelize';  // Importer les opérateurs Sequelize
import User from '../models/userModel.js';  // Modèle User avec Sequelize

dotenv.config();  // Charger les variables d'environnement

// Fonction pour la demande de réinitialisation du mot de passe
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validation de la présence de l'email
  if (!email) {
    return res.status(400).json({ message: "L'email est requis" });
  }

  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Générer un token pour réinitialiser le mot de passe
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 3600000); // Expire dans 1 heure

    // Mettre à jour l'utilisateur avec le token et sa date d'expiration
    await user.update({
      reset_password_token: token,
      reset_password_expires: tokenExpires,
    });

    // Envoyer un email avec le lien de réinitialisation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`,
    });

    res.json({ message: 'Email de réinitialisation envoyé' });
  } catch (error) {
    console.error('Erreur dans forgotPassword:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // Validation de la présence du nouveau mot de passe
  if (!newPassword) {
    return res.status(400).json({ message: 'Un nouveau mot de passe est requis' });
  }

  try {
    // Recherche de l'utilisateur avec le token et s'il n'a pas expiré
    const user = await User.findOne({
      where: {
        reset_password_token: token,
        reset_password_expires: {
          [Op.gt]: new Date(),  // Sequelize opérateur pour vérifier que la date est supérieure à la date actuelle
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe et supprimer le token et sa date d'expiration
    await user.update({
      password: hashedPassword,
      reset_password_token: null,
      reset_password_expires: null,
    });

    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur dans resetPassword:', error);
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};
