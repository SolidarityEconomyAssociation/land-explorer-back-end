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
exports.createGCAccount = exports.getGCAccount = void 0;
const query_1 = __importDefault(require("./query"));
const getGCAccount = (account_id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield query_1.default;
    const gCAccount = yield db.gc_accounts.findOne({ account_id: account_id });
    return gCAccount;
});
exports.getGCAccount = getGCAccount;
const createGCAccount = (account_id, mandate) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield query_1.default;
    const lastGCAccount = yield db.gc_accounts.findOne({}, {
        order: [{ field: 'gc_account_id', direction: 'desc' }]
    });
    const newGCAccountId = lastGCAccount ? parseInt(lastGCAccount.gc_account_id) + 1 : 1;
    const newGCAccount = {
        account_id: account_id,
        gc_account_id: newGCAccountId,
        mandate: mandate
    };
    yield db.gc_accounts.insert(newGCAccount);
    return newGCAccount;
});
exports.createGCAccount = createGCAccount;
