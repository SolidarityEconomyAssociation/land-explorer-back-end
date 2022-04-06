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
exports.getSubscriptionType = void 0;
const query_1 = __importDefault(require("./query"));
const getSubscriptionType = (subscription_type_id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield query_1.default;
    const subscriptionType = yield db.subscription_types.findOne({
        subscription_type_id: subscription_type_id
    });
    return subscriptionType;
});
exports.getSubscriptionType = getSubscriptionType;
