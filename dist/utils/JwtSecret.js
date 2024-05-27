"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
// config.js
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} is not defined in .env file`);
    }
    return value;
};
exports.getEnv = getEnv;
