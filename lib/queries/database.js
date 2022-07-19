"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygonDbSequelize = exports.UserGroupMembership = exports.UserGroup = exports.DataGroupMembership = exports.DataGroup = exports.Marker = exports.PendingUserMap = exports.UserMap = exports.Map = exports.User = exports.sequelize = void 0;
const { Sequelize, DataTypes, Model } = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * CORE Database
 */
exports.sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, (_a = process.env.DATABASE_PASSWORD) !== null && _a !== void 0 ? _a : "", {
    host: (_b = process.env.DATABASE_HOST) !== null && _b !== void 0 ? _b : 'localhost',
    dialect: 'mysql'
});
const UserModel = exports.sequelize.define('User', {
    // Model attributes are defined here
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
const MapModel = exports.sequelize.define('Map', {
    name: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.TEXT, allowNull: false },
    deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
    created_date: Sequelize.DATE,
    last_modified: Sequelize.DATE,
}, {
    tableName: 'map',
    createdAt: 'created_date',
    updatedAt: 'last_modified',
});
const UserMapModel = exports.sequelize.define('UserMap', {
    map_id: { type: DataTypes.BIGINT, references: { model: MapModel, key: 'id' } },
    user_id: { type: DataTypes.BIGINT, references: { model: UserModel, key: 'id' } },
    access: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    viewed: { type: DataTypes.TEXT, allowNull: false, defaultValue: 0 },
    created_date: Sequelize.DATE,
}, {
    tableName: 'user_map',
    createdAt: 'created_date',
    updatedAt: false,
});
const PendingUserMapModel = exports.sequelize.define('PendingUserMap', {
    map_id: { type: DataTypes.BIGINT, references: { model: MapModel, key: 'id' } },
    access: { type: DataTypes.INTEGER, allowNull: false },
    email_address: { type: DataTypes.STRING, allowNull: false },
    created_date: Sequelize.DATE,
}, {
    tableName: 'pending_user_map',
    createdAt: 'created_date',
    updatedAt: false,
});
const DataGroupModel = exports.sequelize.define('DataGroup', {
    iddata_groups: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    title: { type: DataTypes.STRING },
}, {
    tableName: 'data_groups',
    createdAt: false,
    updatedAt: false,
});
const MarkerModel = exports.sequelize.define('Marker', {
    idmarkers: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    data_group_id: { type: DataTypes.BIGINT, references: { model: DataGroupModel, key: 'iddata_groups' }, allowNull: false },
    location: { type: DataTypes.GEOMETRY('POINT'), allowNull: false }
}, {
    tableName: 'markers',
    createdAt: false,
    updatedAt: false,
});
const UserGroupModel = exports.sequelize.define('UserGroup', {
    iduser_groups: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'user_groups',
    createdAt: false,
    updatedAt: false,
});
const DataGroupMembershipModel = exports.sequelize.define('DataGroupMembership', {
    iddata_group_memberships: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    data_group_id: { type: DataTypes.BIGINT, references: { model: DataGroupModel, key: 'iddata_groups' }, allowNull: false },
    user_group_id: { type: DataTypes.BIGINT, references: { model: UserGroupModel, key: 'iduser_groups' }, allowNull: false },
}, {
    tableName: 'data_group_memberships',
    createdAt: false,
    updatedAt: false,
});
const UserGroupMembershipModel = exports.sequelize.define('UserGroupMembership', {
    iduser_group_memberships: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, references: { model: UserModel, key: 'id' }, allowNull: false },
    user_group_id: { type: DataTypes.BIGINT, references: { model: UserGroupModel, key: 'iduser_groups' }, allowNull: false },
}, {
    tableName: 'user_group_memberships',
    createdAt: false,
    updatedAt: false,
});
UserModel.hasMany(UserMapModel, { foreignKey: { name: 'user_id' } });
MapModel.hasMany(UserMapModel, { foreignKey: { name: 'map_id' } });
UserMapModel.belongsTo(UserModel, { foreignKey: { name: 'user_id' } });
UserMapModel.belongsTo(MapModel, { foreignKey: { name: 'map_id' } });
MapModel.hasMany(PendingUserMapModel, { foreignKey: { name: 'map_id' } });
exports.User = UserModel;
exports.Map = MapModel;
exports.UserMap = UserMapModel;
exports.PendingUserMap = PendingUserMapModel;
exports.Marker = MarkerModel;
exports.DataGroup = DataGroupModel;
exports.DataGroupMembership = DataGroupMembershipModel;
exports.UserGroup = UserGroupModel;
exports.UserGroupMembership = UserGroupMembershipModel;
/**
 * Polygon Database
 */
exports.polygonDbSequelize = new Sequelize(process.env.POLYGON_DATABASE_NAME, process.env.POLYGON_DATABASE_USER, (_c = process.env.POLYGON_DATABASE_PASSWORD) !== null && _c !== void 0 ? _c : "", {
    host: (_d = process.env.POLYGON_DATABASE_HOST) !== null && _d !== void 0 ? _d : 'localhost',
    dialect: 'mysql'
});
