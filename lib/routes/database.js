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
exports.databaseRoutes = void 0;
const validation_1 = require("../validation");
const jwt = require("jsonwebtoken");
const query = require('../queries/query');
const Model = require('../queries/database');
const mailer = require('../queries/mails');
const helper = require('../queries/helpers');
// async function getUserByIdRoute(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
//     let result = await query.getUser({
//         where: { id: request.params.id },
//         raw: true
//     });
//     return h.response(result);
// }
// async function getUserByUsername(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
//     let result = await query.usernameExist(request.params.id);
//     return h.response(result);
// }
/**
 * Register new user using request data from API
 * @param request
 * @param h
 * @returns
 */
function registerUser(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        let validation = new validation_1.Validation();
        yield validation.validateUserRegister(request.payload);
        if (validation.fail()) {
            return h.response(validation.errors).code(400);
        }
        // // create user on database
        let user = yield query.registerUser(request.payload);
        //migrate user map from guest account
        yield query.migrateGuestUserMap(user);
        // sent register email
        mailer.sendRegisterEmail();
        // return h.response(user);
        return h.response(user);
    });
}
/**
 * Handle user login using request data from API
 * @param request
 * @param h
 * @returns
 */
function loginUser(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("hello");
        try {
            let payload = request.payload;
            let result = yield query.checkUser(payload.username, payload.password);
            if (result) {
                const config = process.env;
                const expiry_day = parseInt(process.env.TOKEN_EXPIRY_DAYS || '10');
                // Create token
                const token = jwt.sign({
                    user_id: result.id,
                    username: result.username,
                    council_id: result.council_id,
                    is_super_user: (result.is_super_user && result.is_super_user[0] == '1') ? 1 : 0,
                    enabled: (result.enabled && result.enabled[0] == '1') ? 1 : 0,
                    marketing: (result.enabled && result.enabled[0] == '1') ? 1 : 0,
                }, process.env.TOKEN_KEY, {
                    expiresIn: expiry_day + "d",
                });
                // save user token
                result.token = token;
                return h.response({
                    access_token: token,
                    token_type: "bearer",
                    expires_in: expiry_day * 24 * 60 * 60
                });
            }
            return h.response({
                error: "invalid_credentials",
                error_description: "Username and password combination does not match our record."
            }).code(400);
        }
        catch (err) {
            console.log(err.message);
            return h.response("internal server error!").code(500);
        }
    });
}
/**
 * Return the detail of authenticated user
 * @param request
 * @param h
 * @param d
 * @returns
 */
function getAuthUserDetails(request, h, d) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield query.getUserById(request.auth.artifacts.user_id);
            return h.response([{
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    marketing: user.marketing ? 1 : 0,
                    organisation: (_a = user.organisation) !== null && _a !== void 0 ? _a : "",
                    organisationNumber: (_b = user.organisation_number) !== null && _b !== void 0 ? _b : "",
                    organisationType: (_c = user.organisation_type) !== null && _c !== void 0 ? _c : "",
                    organisationActivity: (_d = user.organisation_activity) !== null && _d !== void 0 ? _d : "",
                    address1: (_e = user.address1) !== null && _e !== void 0 ? _e : "",
                    address2: (_f = user.address2) !== null && _f !== void 0 ? _f : "",
                    city: (_g = user.city) !== null && _g !== void 0 ? _g : "",
                    postcode: (_h = user.postcode) !== null && _h !== void 0 ? _h : "",
                    phone: (_j = user.phone) !== null && _j !== void 0 ? _j : "",
                    council_id: (_k = user.council_id) !== null && _k !== void 0 ? _k : 0,
                    is_super_user: (_l = user.is_super_user) !== null && _l !== void 0 ? _l : 0,
                }]);
        }
        catch (err) {
            console.log(err.message);
            return h.response("internal server error!").code(500);
        }
    });
}
/**
 * Update the email of autheticated user
 * @param request
 * @param h
 * @param d
 * @returns
 */
function changeEmail(request, h, d) {
    return __awaiter(this, void 0, void 0, function* () {
        let validation = new validation_1.Validation();
        yield validation.validateChangeEmail(request.payload);
        if (validation.fail()) {
            return h.response(validation.errors).code(400);
        }
        let payload = request.payload;
        try {
            yield Model.User.update({ username: payload.username }, {
                where: {
                    id: request.auth.artifacts.user_id
                }
            });
        }
        catch (err) {
            console.log(err.message);
            return h.response("internal server error!").code(500);
        }
        return h.response().code(200);
    });
}
/**
 * Change the user detail of the authenticated user
 * @param request
 * @param h
 * @param d
 * @returns
 */
function changeUserDetail(request, h, d) {
    return __awaiter(this, void 0, void 0, function* () {
        let validation = new validation_1.Validation();
        yield validation.validateUserDetailUpdate(request.payload);
        if (validation.fail()) {
            return h.response(validation.errors).code(400);
        }
        let payload = request.payload;
        try {
            yield Model.User.update({
                first_name: payload.firstName,
                last_name: payload.lastName,
                address1: payload.address1,
                address2: payload.address2,
                postcode: payload.postcode,
                phone: payload.phone,
                organisation: payload.organisation,
                organisation_number: payload.organisationNumber,
                organisation_type: payload.organisationType,
                organisation_activity: payload.organisationActivity,
            }, {
                where: {
                    id: request.auth.artifacts.user_id
                }
            });
        }
        catch (err) {
            console.log(err.message);
            return h.response("internal server error!").code(500);
        }
        return h.response().code(200);
    });
}
/**
 * Allow logged in user to change its password
 *
 * @param request
 * @param h
 * @param d
 * @returns
 */
function changePassword(request, h, d) {
    return __awaiter(this, void 0, void 0, function* () {
        let validation = new validation_1.Validation();
        yield validation.validateChangeEmail(request.payload);
        if (validation.fail()) {
            return h.response(validation.errors).code(400);
        }
        let payload = request.payload;
        try {
            yield Model.User.update({ password: helper.hashPassword(payload.password) }, {
                where: {
                    id: request.auth.artifacts.user_id
                }
            });
        }
        catch (err) {
            console.log(err.message);
            return h.response("internal server error!").code(500);
        }
        return h.response().code(200);
    });
}
/**
 * Allow user to request for password reset when they forget their password
 *
 * @param request
 * @param h
 * @param d
 * @returns
 */
function resetPassword(request, h, d) {
    return __awaiter(this, void 0, void 0, function* () {
        let validation = new validation_1.Validation();
        yield validation.validateResetPassword(request.payload);
        if (validation.fail()) {
            return h.response(validation.errors).code(400);
        }
        let payload = request.payload;
        try {
            let user = yield Model.User.findOne({
                where: {
                    username: payload.username
                }
            });
            if (!user) {
                //If this email is not an user, notify them accordingly 
                mailer.resetPasswordNotFound(payload.username);
                return h.response().code(200);
            }
            // generate new random password
            const newPassword = helper.randomPassword();
            console.log('New user password is: ' + newPassword);
            // update user password
            yield Model.User.update({ password: helper.hashPassword(newPassword) }, {
                where: {
                    id: user.id
                }
            });
            // send email
            mailer.resetPassword(payload.username, user.first_name, newPassword);
        }
        catch (err) {
            console.log(err.message);
            return h.response("internal server error!").code(500);
        }
        return h.response().code(200);
    });
}
exports.databaseRoutes = [
    // public API
    { method: "POST", path: "/api/user/register/", handler: registerUser, options: { auth: false } },
    { method: "POST", path: "/api/user/password-reset/", handler: resetPassword, options: { auth: false } },
    {
        method: "POST", path: "/api/token", handler: loginUser, options: {
            auth: false,
        }
    },
    // Authenticated users only
    { method: "GET", path: "/api/user/details/", handler: getAuthUserDetails },
    { method: "POST", path: "/api/user/email", handler: changeEmail, },
    { method: "POST", path: "/api/user/details", handler: changeUserDetail, },
    { method: "POST", path: "/api/user/password", handler: changePassword, },
];
