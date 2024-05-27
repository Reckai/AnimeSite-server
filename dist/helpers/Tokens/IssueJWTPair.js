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
exports.issueJWTPair = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const Role_1 = require("../../Roles/Role");
const JwtSecret_1 = require("../../utils/JwtSecret");
const context_1 = require("../../context");
const issueJWTPair = (userId, role = Role_1.Role.USER) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = (0, uuid_1.v4)();
    yield context_1.context.prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId,
            role
        }
    });
    return {
        token: jsonwebtoken_1.default.sign({ userId, role }, (0, JwtSecret_1.getEnv)("JWT_SECRET"), { expiresIn: '15m' }),
        refreshToken
    };
});
exports.issueJWTPair = issueJWTPair;
