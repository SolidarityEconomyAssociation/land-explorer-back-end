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
exports.checkUser = exports.registerUser = exports.usernameExist = exports.getUserById = exports.getUser = void 0;
const { sequelize, User } = require('./database');
const bcrypt = require('bcrypt');
const getUser = (options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield User.findOne(options);
    return result;
});
exports.getUser = getUser;
/**
 *
 * @param id
 * @returns
 */
const getUserById = (id, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findByPk(id, options);
});
exports.getUserById = getUserById;
/**
 * Check whether user with the given username exist
 *
 * @param username
 * @returns
 */
const usernameExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield User.findOne({ where: { username: username } })) !== null;
});
exports.usernameExist = usernameExist;
/**
 * Register user with data from API request.
 * Data should already be validated.
 *
 * @param data
 * @returns
 */
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.create({
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        enabled: 1,
        access: 2,
        first_name: data.firstName,
        last_name: data.lastName,
        address1: data.address1,
        address2: data.address2,
        postcode: data.postcode,
        phone: data.phone,
        organisation_number: data.organisationNumber,
        organisation: data.organisation,
        organisation_activity: data.organisationSubType,
        organisation_type: data.organisationType,
        marketing: data.marketing,
        council_id: data.username.endsWith("rbkc.gov.uk") ? 1 : 0
    });
});
exports.registerUser = registerUser;
/**
 * Before a user is registered, other existing user may have shared a map to this user.
 * These map are stored in 'pending_user_map'. Now that a given user is registered,
 * we migrate the map to 'user_map'
 *
 * @param data
 * @returns
 */
const migrateGuestUserMap = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(User);
    // return await User.create({
    //   username             : data.username,
    //   password             : bcrypt.hashSync(data.password, 10),
    //   enabled              : 1,
    //   access               : 2,
    //   first_name           : data.firstName,
    //   last_name            : data.lastName,
    //   address1             : data.address1,
    //   address2             : data.address2,
    //   postcode             : data.postcode,
    //   phone                : data.phone,
    //   organisation_number  : data.organisationNumber,
    //   organisation         : data.organisation,
    //   organisation_activity: data.organisationSubType,
    //   organisation_type    : data.organisationType,
    //   marketing            : data.marketing,
    //   council_id           : data.username.endsWith("rbkc.gov.uk") ? 1: 0
    // });
});
/**
 *
 * @param username
 * @param password
 * @returns User
 */
function checkUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, exports.getUser)({ where: { username: username }, raw: true });
        if (user == null) {
            return false;
        }
        const match = yield bcrypt.compare(password, user.password);
        if (match) {
            return user;
        }
        return false;
    });
}
exports.checkUser = checkUser;
