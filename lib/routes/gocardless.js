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
exports.goCardlessRoutes = void 0;
const constants = require('gocardless-nodejs/constants');
const gocardless = require('gocardless-nodejs');
const client = gocardless(process.env.GOCARDLESS_KEY, constants.Environments.Sandbox);
function fetchGocardless(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        const listResponse = yield client.customers.list();
        const customers = listResponse.customers;
        const response = h.response({
            success: true,
            data: {
                customers: customers
            }
        });
        response.header('Content-Type', 'application/json');
        return response;
    });
}
const createBillingFlow = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const billingRequest = yield client.billingRequests.create({
        mandate_request: {
            currency: "GBP",
            scheme: "bacs"
        }
    });
    const billingRequestFlow = yield client.billingRequestFlows.create({
        redirect_uri: "https://my-company.com/landing",
        exit_uri: "https://my-company.com/exit",
        links: {
            billing_request: billingRequest.id,
        }
    });
    const response = h.response({
        success: true,
        billingRequestFlowID: billingRequestFlow.id
    });
    response.header('Content-Type', 'application/json');
    return response;
});
exports.goCardlessRoutes = [
    {
        method: "GET",
        path: "/gocardless",
        handler: fetchGocardless
    },
    {
        method: "POST",
        path: "/gocardless/billing/flow",
        options: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: createBillingFlow
    },
];
