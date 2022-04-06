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
exports.helloRoutes = void 0;
// import { getUser } from '../queries/database';
function sayHello(request, h) {
    return __awaiter(this, void 0, void 0, function* () {
        // let responseData = await getUser({});
        // console.log(responseData);
        const name = request.params.name || "World";
        const response = h.response("Hello a");
        return response;
    });
}
exports.helloRoutes = [
    {
        method: "GET",
        path: "/hello",
        handler: sayHello
    },
    {
        method: "GET",
        path: "/hello/{name}",
        handler: sayHello
    }
];
