"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('database');
class User extends Model {
}
exports.User = User;
User.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    address1: { type: DataTypes.STRING },
    address2: { type: DataTypes.STRING },
    postcode: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    marketing: { type: DataTypes.BOOLEAN },
    organisationNumber: { type: DataTypes.STRING },
    organisation: { type: DataTypes.STRING },
    organisationSubType: { type: DataTypes.STRING },
    organisationType: { type: DataTypes.STRING },
}, {
    // Other model options go here
    sequelize,
    modelName: 'User' // We need to choose the model name
});
