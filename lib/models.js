"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.User = void 0;
const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./queries/database');
class User extends Model {
}
exports.User = User;
User.init({
    // Model attributes are defined here
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: { type: DataTypes.STRING },
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
const getUser = (options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield sequelize;
    return db.models.User.findOne(options);
});
exports.getUser = getUser;
