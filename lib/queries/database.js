"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingUserMap = exports.UserMap = exports.Map = exports.User = exports.sequelize = void 0;
const { Sequelize, DataTypes, Model } = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, (_a = process.env.DATABASE_PASSWORD) !== null && _a !== void 0 ? _a : "", {
    host: (_b = process.env.DATABASE_HOST) !== null && _b !== void 0 ? _b : 'localhost',
    dialect: 'mysql'
});
exports.User = exports.sequelize.define('User', {
    // Model attributes are defined here
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrementing: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    postcode: DataTypes.STRING,
    marketing: DataTypes.BOOLEAN,
    organisation: DataTypes.STRING,
    organisation_activity: DataTypes.STRING,
    organisation_number: DataTypes.STRING,
    organisation_type: DataTypes.STRING,
    council_id: { type: DataTypes.INTEGER, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    access: DataTypes.INTEGER,
    enabled: DataTypes.INTEGER,
    is_super_user: { type: DataTypes.BOOLEAN, allowNull: false },
    created_date: Sequelize.DATE,
    last_modified: Sequelize.DATE,
}, {
    tableName: 'user',
    createdAt: 'created_date',
    updatedAt: 'last_modified',
});
exports.Map = exports.sequelize.define('Map', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrementing: true },
    name: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.TEXT, allowNull: false },
    deleted: { type: DataTypes.BOOLEAN, allowNull: false },
    created_date: Sequelize.DATE,
    last_modified: Sequelize.DATE,
}, {
    tableName: 'map',
    createdAt: 'created_date',
    updatedAt: 'last_modified',
});
exports.UserMap = exports.sequelize.define('UserMap', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrementing: true },
    map_id: { type: DataTypes.BIGINT, references: { model: exports.Map, key: 'id' } },
    user_id: { type: DataTypes.BIGINT, references: { model: exports.User, key: 'id' } },
    access: { type: DataTypes.INTEGER, allowNull: false },
    viewed: { type: DataTypes.TEXT, allowNull: false, defaultValue: 0 },
    deleted: { type: DataTypes.BOOLEAN, allowNull: false },
    created_date: Sequelize.DATE,
}, {
    tableName: 'user_map',
    createdAt: 'created_date',
    updatedAt: false,
});
exports.PendingUserMap = exports.sequelize.define('PendingUserMap', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrementing: true },
    map_id: { type: DataTypes.BIGINT, references: { model: exports.Map, key: 'id' } },
    access: { type: DataTypes.INTEGER, allowNull: false },
    email_address: { type: DataTypes.STRING, allowNull: false },
    created_date: Sequelize.DATE,
}, {
    tableName: 'pending_user_map',
    createdAt: 'created_date',
    updatedAt: false,
});
