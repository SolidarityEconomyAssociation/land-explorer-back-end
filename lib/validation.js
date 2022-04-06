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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const Joi = require('joi');
const query = require('./queries/query');
class Validation {
    constructor() {
        this.errors = {};
    }
    fail() {
        return Object.entries(this.errors).length !== 0;
    }
    /**
     * @param data
     * @returns
     */
    validateUserRegister(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //username: required | email | unique | length < 101
            if (Joi.string().validate(data.username, { presence: "required" }).error) {
                this.addErrorMessage("username", "The email field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().email().validate(data.username).error) {
                    this.addErrorMessage("username", "Please provide a valid email.");
                }
                ;
                if (Joi.string().max(100).validate(data.username).error) {
                    this.addErrorMessage("username", "The email field cannot be longer than 100 characters.");
                }
                ;
                if (yield query.usernameExist(data.username)) {
                    this.addErrorMessage("username", "This email has already been registered.");
                }
            }
            //password: required | 4 < length < 101
            if (Joi.string().validate(data.password, { presence: "required" }).error) {
                this.addErrorMessage("password", "The password field is required.");
            }
            else {
                if (Joi.string().min(5).max(100).validate(data.password).error) {
                    this.addErrorMessage("password", "The password has to be between 5 and 100 characters.");
                }
                ;
            }
            //firstName: required | length < 101
            if (Joi.string().validate(data.firstName, { presence: "required" }).error) {
                this.addErrorMessage("firstName", "The first name field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().max(100).validate(data.firstName).error) {
                    this.addErrorMessage("firstName", "The first name field cannot be longer than 100 characters.");
                }
                ;
            }
            //lastName: required | length < 101
            if (Joi.string().validate(data.lastName, { presence: "required" }).error) {
                this.addErrorMessage("lastName", "The first name field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().max(100).validate(data.lastName).error) {
                    this.addErrorMessage("lastName", "The first name field cannot be longer than 100 characters.");
                }
                ;
            }
            let optionalWithMax = function (validator, data, key, max, label) {
                if (data[key] !== null) {
                    if (Joi.string().max(max).validate(data[key]).error) {
                        validator.addErrorMessage(key, label + " field cannot be longer than " + max + " characters.");
                    }
                    ;
                }
            };
            optionalWithMax(this, data, 'postcode', 10, "Post code");
            optionalWithMax(this, data, 'phone', 20, "Phone");
            optionalWithMax(this, data, 'address1', 100, "Address");
            optionalWithMax(this, data, 'address2', 100, "Address");
            optionalWithMax(this, data, 'organisation', 100, "Organisation");
            optionalWithMax(this, data, 'organisationSubType', 100, "Organisation activity");
            optionalWithMax(this, data, 'organisationNumber', 100, "Organisation number");
            optionalWithMax(this, data, 'organisationType', 100, "Organisation type");
            return this;
        });
    }
    /**
     *
     * @param key
     * @param message
     * @returns
     */
    addErrorMessage(key, message) {
        if (this.errors.hasOwnProperty(key)) {
            this.errors[key].push(message);
        }
        else {
            this.errors[key] = [message];
        }
        return this;
    }
}
exports.Validation = Validation;
