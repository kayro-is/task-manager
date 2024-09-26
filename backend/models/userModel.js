import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reset_password_token: {
    type: DataTypes.STRING,
  },
  reset_password_expires: {
    type: DataTypes.DATE,
  },
}, {
  freezeTableName: true,
  tableName: 'users',  // Nom de la table en minuscule
  timestamps: false,   // Désactiver les colonnes createdAt et updatedAt
});

export default User;
