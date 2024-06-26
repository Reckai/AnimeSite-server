"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthReducer = void 0;
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
const graphql_1 = require("graphql");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtSecret_1 = require("../utils/JwtSecret");
const EXPIRE_TIME = '15m';
(0, type_graphql_1.Resolver)();
class AuthReducer {
    refreshAccessAndRefreshToken(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.token) {
                throw new graphql_1.GraphQLError("token is not provided");
            }
            const recentToken = yield ctx.prisma.refreshToken.findUnique({
                where: {
                    token: ctx.token
                }
            });
            if (!recentToken) {
                throw new graphql_1.GraphQLError("token is not valid");
            }
            const newAccessToken = jsonwebtoken_1.default.sign({ userId: recentToken.userId, role: recentToken.role }, (0, JwtSecret_1.getEnv)("JWT_SECRET"), { expiresIn: EXPIRE_TIME });
            const newRefreshToken = (0, uuid_1.v4)();
            yield ctx.prisma.refreshToken.update({
                where: {
                    token: ctx.token
                },
                data: {
                    token: newRefreshToken
                }
            });
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            };
        });
    }
}
exports.AuthReducer = AuthReducer;
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthReducer.prototype, "refreshAccessAndRefreshToken", null);
