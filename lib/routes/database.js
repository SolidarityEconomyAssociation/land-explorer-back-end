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
const jwt = require("jsonwebtoken");
const query = require('../queries/query');
const Model = require('../queries/database');
function getUserRoute(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield query.getUser({ raw: true });
        const response = h.response(result == null ? 'a' : ' b');
        // response.header('X-Custom', 'some-value');
        return response;
    });
}
function getUserByIdRoute(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield query.getUser({
            where: { id: request.params.id },
            raw: true
        });
        return h.response(result);
    });
}
function getUserByUsername(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield query.usernameExist(request.params.id);
        return h.response(result);
    });
}
/**
 * Register new user using request data from API
 * @param request
 * @param h
 * @returns
 */
function registerUser(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(123);
        // let validation = new Validation();
        // await validation.validateUserRegister(request.payload);
        // if (validation.fail()) {
        //     return h.response(validation.errors);
        // }
        // // create user on database
        // let user = query.registerUser(request.payload);
        // migrate user map from guest account
        //query.migrateGuestUserMap(user);
        // sent register email
        // return h.response(user);
        return h.response("!");
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
        return h.response(result);
    });
}
function getAuthUser(request, h, d) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield query.getUserById(request.auth.artifacts.user_id);
        }
        catch (err) {
            console.log(err.message);
        }
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
    });
}
exports.databaseRoutes = [
    // public API
    {
        method: "POST",
        path: "/api/user/register/",
        handler: registerUser,
        options: {
            auth: false
        }
    },
    {
        method: "POST",
        path: "/token",
        handler: loginUser,
        options: {
            auth: false
        }
    },
    // authenticated via token only
    {
        method: "GET",
        path: "/api/user/",
        handler: getUserRoute
    },
    {
        method: "GET",
        path: "/api/user/details",
        handler: getAuthUser
    },
];
