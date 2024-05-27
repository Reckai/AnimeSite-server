"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromToken = exports.getTokenPayload = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const JwtSecret_1 = require("./JwtSecret");
const graphql_1 = require("graphql");
function getTokenPayload(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(noBearerToken, (0, JwtSecret_1.getEnv)('JWT_SECRET'));
        console.log(decoded);
        return decoded;
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            return {
                message: 'Token expired'
            };
        }
        throw new graphql_1.GraphQLError('Not authenticated');
    }
}
exports.getTokenPayload = getTokenPayload;
function getDataFromToken(authToken) {
    if (authToken) {
        const { userId, role } = getTokenPayload(authToken);
        return {
            userId,
            role
        };
    }
    throw new graphql_1.GraphQLError('Not authenticated');
}
exports.getDataFromToken = getDataFromToken;
