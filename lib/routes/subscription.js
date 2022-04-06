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
exports.subscriptionRoutes = void 0;
const accounts_1 = require("../queries/accounts");
const subscription_types_1 = require("../queries/subscription_types");
const subscriptions_1 = require("../queries/subscriptions");
const gc_accounts_1 = require("../queries/gc_accounts");
const gc_subscriptions_1 = require("../queries/gc_subscriptions");
const constants = require('gocardless-nodejs/constants');
const gocardless = require('gocardless-nodejs');
const client = gocardless(process.env.GOCARDLESS_KEY, constants.Environments.Sandbox);
const makeSubscription = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { mandate, email, firstName, lastName, subscriptionTypeId } = request.payload;
    const name = firstName + " " + lastName;
    const subscriptionType = yield (0, subscription_types_1.getSubscriptionType)(subscriptionTypeId);
    if (!subscriptionType) {
        return h.response({
            success: false,
            message: "no subscription type matched that id"
        });
    }
    const gCSubscription = yield client.subscriptions.create({
        amount: subscriptionType.cost,
        currency: subscriptionType.currency,
        name: subscriptionType.name,
        interval_unit: subscriptionType.cadence_unit,
        day_of_month: subscriptionType.cadence,
        metadata: {
            product: subscriptionType.name
        },
        links: {
            mandate: mandate
        }
    });
    let account = yield (0, accounts_1.getAccount)(email);
    if (!account) {
        account = yield (0, accounts_1.createAccount)(email, name);
    }
    let gCAccount = yield (0, gc_accounts_1.getGCAccount)(account.account_id);
    if (!gCAccount) {
        gCAccount = yield (0, gc_accounts_1.createGCAccount)(account.account_id, mandate);
    }
    const subscription = yield (0, subscriptions_1.createSubscription)(account.account_id, 1, 1);
    yield (0, gc_subscriptions_1.createGCSubscription)(gCAccount.gc_account_id, gCSubscription.id, subscription.subscription_id);
    const response = h.response({
        success: true,
        subscription: subscription
    });
    response.header('Content-Type', 'application/json');
    return response;
});
const fetchSubscription = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subscriptionTypeId } = request.params;
    const subscription = yield (0, subscriptions_1.getSubscription)(email, subscriptionTypeId);
    const response = h.response({
        success: true,
        subscription: subscription
    });
    response.header('Content-Type', 'application/json');
    return response;
});
exports.subscriptionRoutes = [
    {
        method: "POST",
        path: "/subscription",
        options: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: makeSubscription
    },
    {
        method: "GET",
        path: "/subscription/{email}/{subscriptionTypeId}",
        options: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: fetchSubscription
    },
];
