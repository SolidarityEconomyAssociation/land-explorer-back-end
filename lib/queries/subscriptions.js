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
exports.createSubscription = exports.getSubscription = void 0;
const query_1 = __importDefault(require("./query"));
const getSubscription = (email, subscriptionTypeId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield query_1.default;
    const account = yield db.accounts.findOne({ email: email });
    if (!account)
        return null;
    const subscription = yield db.subscriptions.findOne({
        account_id: account.account_id,
        subscription_type: subscriptionTypeId
    });
    return subscription;
});
exports.getSubscription = getSubscription;
const createSubscription = (account_id, subscription_type, status_type) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield query_1.default;
    const lastSubscription = yield db.subscriptions.findOne({}, {
        order: [{ field: 'subscription_id', direction: 'desc' }]
    });
    const newSubscriptionId = lastSubscription ? parseInt(lastSubscription.subscription_id) + 1 : 1;
    const now = (new Date()).toISOString();
    const newSubscription = {
        subscription_id: newSubscriptionId,
        account_id: account_id,
        subscription_type: subscription_type,
        started: now,
        status_type: status_type
    };
    yield db.subscriptions.insert(newSubscription);
    return newSubscription;
});
exports.createSubscription = createSubscription;
