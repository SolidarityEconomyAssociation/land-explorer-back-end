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
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.username, { presence: "required" }).error) {
                this.addErrorMessage("username", "The email field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().email().validate(data === null || data === void 0 ? void 0 : data.username).error) {
                    this.addErrorMessage("username", "Please provide a valid email.");
                }
                ;
                if (Joi.string().max(100).validate(data === null || data === void 0 ? void 0 : data.username).error) {
                    this.addErrorMessage("username", "The email field cannot be longer than 100 characters.");
                }
                ;
                if (yield query.usernameExist(data === null || data === void 0 ? void 0 : data.username)) {
                    this.addErrorMessage("username", "This email has already been registered.");
                }
            }
            //password: required | 4 < length < 101
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.password, { presence: "required" }).error) {
                this.addErrorMessage("password", "The password field is required.");
            }
            else {
                if (Joi.string().min(5).max(100).validate(data === null || data === void 0 ? void 0 : data.password).error) {
                    this.addErrorMessage("password", "The password has to be between 5 and 100 characters.");
                }
                ;
            }
            //firstName: required | length < 101
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.firstName, { presence: "required" }).error) {
                this.addErrorMessage("firstName", "The first name field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().max(100).validate(data === null || data === void 0 ? void 0 : data.firstName).error) {
                    this.addErrorMessage("firstName", "The first name field cannot be longer than 100 characters.");
                }
                ;
            }
            //lastName: required | length < 101
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.lastName, { presence: "required" }).error) {
                this.addErrorMessage("lastName", "The last name field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().max(100).validate(data === null || data === void 0 ? void 0 : data.lastName).error) {
                    this.addErrorMessage("lastName", "The last name field cannot be longer than 100 characters.");
                }
                ;
            }
            function optionalWithMax(validator, data, key, max, label) {
                if (data[key] !== null && data[key] !== "") {
                    if (Joi.string().max(max).validate(data[key]).error) {
                        validator.addErrorMessage(key, label + " field cannot be longer than " + max + " characters.");
                    }
                    ;
                }
            }
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
     * @param data
     * @returns
     */
    validateUserDetailUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //firstName: required | length < 101
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.firstName, { presence: "required" }).error) {
                this.addErrorMessage("firstName", "The first name field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().max(100).validate(data === null || data === void 0 ? void 0 : data.firstName).error) {
                    this.addErrorMessage("firstName", "The first name field cannot be longer than 100 characters.");
                }
                ;
            }
            //lastName: required | length < 101
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.lastName, { presence: "required" }).error) {
                this.addErrorMessage("lastName", "The last name field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().max(100).validate(data === null || data === void 0 ? void 0 : data.lastName).error) {
                    this.addErrorMessage("lastName", "The last name field cannot be longer than 100 characters.");
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
     * @param data
     * @returns
     */
    validateChangeEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //password: required | 4 < length < 101
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.password, { presence: "required" }).error) {
                this.addErrorMessage("password", "The password field is required.");
            }
            else {
                if (Joi.string().min(5).max(100).validate(data === null || data === void 0 ? void 0 : data.password).error) {
                    this.addErrorMessage("password", "The password has to be between 5 and 100 characters.");
                }
                ;
            }
            //passwordConfirm must match password
            if ((data === null || data === void 0 ? void 0 : data.password) !== (data === null || data === void 0 ? void 0 : data.passwordConfirm)) {
                this.addErrorMessage("password", "Password and password confirmation does not match!");
            }
            return this;
        });
    }
    /**
     * @param data
     * @returns
     */
    validateChangePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //password: required | email | unique | length < 101
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.username, { presence: "required" }).error) {
                this.addErrorMessage("username", "The email field is required.");
            }
            else {
                // Cant do these checks if it is null or empty
                if (Joi.string().email().validate(data === null || data === void 0 ? void 0 : data.username).error) {
                    this.addErrorMessage("username", "Please provide a valid email.");
                }
                ;
                if (Joi.string().max(100).validate(data === null || data === void 0 ? void 0 : data.username).error) {
                    this.addErrorMessage("username", "The email field cannot be longer than 100 characters.");
                }
                ;
                if (yield query.usernameExist(data === null || data === void 0 ? void 0 : data.username)) {
                    this.addErrorMessage("username", "This email has already been registered.");
                }
            }
            return this;
        });
    }
    /**
     * @param data
     * @returns
     */
    validateResetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //username: required
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.username, { presence: "required" }).error) {
                this.addErrorMessage("username", "The email field is required.");
            }
            return this;
        });
    }
    /**
     * @param data
     * @returns
     */
    validateSaveMap(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //name: required
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.name, { presence: "required" }).error) {
                this.addErrorMessage("name", "The name field is required.");
            }
            //data: required
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.data, { presence: "required" }).error) {
                this.addErrorMessage("data", "The data field is required.");
            }
            return this;
        });
    }
    /**
     * Validate eid is provided
     *
     * @param data
     * @returns
     */
    validateEid(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.eid, { presence: "required" }).error) {
                this.addErrorMessage("eid", "The eid field is required.");
            }
            return this;
        });
    }
    /**
     * Validate share map request
     *
     * @param data
     * @returns
     */
    validateShareMap(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // eid required
            if (Joi.string().validate(data === null || data === void 0 ? void 0 : data.eid, { presence: "required" }).error) {
                this.addErrorMessage("eid", "The eid field is required.");
            }
            // array of email address required (can be empty array)
            if (Joi.array().items(Joi.string(), Joi.number()).validate(data === null || data === void 0 ? void 0 : data.emailAddresses).error) {
                this.addErrorMessage("emailAddresses", "The emailAddresses field is required.");
            }
            return this;
        });
    }
    /**
     * Validate polygon
     *
     * @param data
     * @returns
     */
    validateLandOwnershipPolygonRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // sw_lng, sw_lat, ne_lng, ne_lat required
            if (Joi.number().validate(data === null || data === void 0 ? void 0 : data.sw_lng, { presence: "required" }).error) {
                this.addErrorMessage("sw_lng", "The sw_lng field is required.");
            }
            if (Joi.number().validate(data === null || data === void 0 ? void 0 : data.sw_lat, { presence: "required" }).error) {
                this.addErrorMessage("sw_lat", "The sw_lat field is required.");
            }
            if (Joi.number().validate(data === null || data === void 0 ? void 0 : data.ne_lng, { presence: "required" }).error) {
                this.addErrorMessage("ne_lng", "The ne_lng field is required.");
            }
            if (Joi.number().validate(data === null || data === void 0 ? void 0 : data.ne_lat, { presence: "required" }).error) {
                this.addErrorMessage("ne_lat", "The ne_lat field is required.");
            }
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
