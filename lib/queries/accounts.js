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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.getAccount = void 0;
const query_1 = __importDefault(require("./query"));
const getAccount = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield query_1.default;
    const account = yield db.accounts.findOne({ email: email });
    return account;
});
exports.getAccount = getAccount;
const createAccount = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield query_1.default;
    const lastAccount = yield db.accounts.findOne({}, {
        order: [{ field: 'account_id', direction: 'desc' }]
    });
    const newAccountId = lastAccount ? parseInt(lastAccount.account_id) + 1 : 1;
    const newAccount = {
        account_id: newAccountId,
        name: name,
        email: email
    };
    yield db.accounts.insert(newAccount);
    return newAccount;
});
exports.createAccount = createAccount;
