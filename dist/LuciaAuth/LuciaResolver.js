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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LuciaResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../User/User");
const auth_1 = require("./auth");
let LuciaResolver = class LuciaResolver {
    createUser(name, email, password, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ctx.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });
            const newUser = yield ctx.prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!newUser)
                throw new Error('Something went wrong');
            const session = yield auth_1.lucia.createSession(newUser.id, {});
            return ctx.res
                .appendHeader("Set-Cookie", auth_1.lucia.createSessionCookie(session.id).serialize());
        });
    }
};
exports.LuciaResolver = LuciaResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)('name')),
    __param(1, (0, type_graphql_1.Arg)('email')),
    __param(2, (0, type_graphql_1.Arg)('password')),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], LuciaResolver.prototype, "createUser", null);
exports.LuciaResolver = LuciaResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], LuciaResolver);
