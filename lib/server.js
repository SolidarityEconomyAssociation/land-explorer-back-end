'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.init = exports.server = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const database_1 = require("./routes/database");
const maps_1 = require("./routes/maps");
const markers_1 = require("./routes/markers");
const AuthBearer = require('hapi-auth-bearer-token');
const Inert = require('@hapi/inert');
const jwt = require("jsonwebtoken");
const query = require("./queries/query");
function index(request) {
    console.log("Processing request", request.info.id);
    return "Hello! Nice to have met you...";
}
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        exports.server = hapi_1.default.server({
            port: process.env.PORT || 4000,
            host: '0.0.0.0',
        });
        yield exports.server.register(AuthBearer);
        yield exports.server.register(Inert);
        exports.server.auth.strategy('simple', 'bearer-access-token', {
            allowQueryToken: true,
            validate: (request, token, h) => __awaiter(this, void 0, void 0, function* () {
                let decodedToken = false;
                try {
                    decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
                }
                catch (err) {
                }
                const credentials = { token };
                let artifacts = {};
                try {
                    // All user data already stored in token
                    // const user = await query.getUserById(decodedToken.user_id, { raw: true })
                    // see the loginUser function to see token content
                    artifacts = decodedToken;
                }
                catch (err) {
                    console.log(err.message);
                }
                return { isValid: decodedToken, credentials, artifacts };
            })
        });
        exports.server.auth.default('simple');
        exports.server.route({
            method: "GET",
            path: "/",
            handler: index,
            options: {
                auth: false
            }
        });
        exports.server.route(database_1.databaseRoutes);
        exports.server.route(maps_1.mapRoutes);
        exports.server.route(markers_1.markerRoutes);
        return exports.server;
    });
};
exports.init = init;
const start = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Listening on ${exports.server.settings.host}:${exports.server.settings.port}`);
        return exports.server.start();
    });
};
exports.start = start;
process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
