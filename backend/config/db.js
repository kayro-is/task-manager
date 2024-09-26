import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // Charger les variables d'environnement

// Créer une nouvelle instance de Sequelize pour PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,  // Désactiver les logs SQL
});

// Tester la connexion à la base de données
try {
  await sequelize.authenticate();
  console.log('Connexion réussie à la base de données PostgreSQL.');
} catch (error) {
  console.error('Impossible de se connecter à la base de données :', error);
}

export default sequelize;

