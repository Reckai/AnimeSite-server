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
exports.UserResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const graphql_1 = require("graphql");
const Role_1 = require("../Roles/Role");
const IssueJWTPair_1 = require("../helpers/Tokens/IssueJWTPair");
let UserLoginInput = class UserLoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "password", void 0);
UserLoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserLoginInput);
let AuthPayload = class AuthPayload {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AuthPayload.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", User_1.User)
], AuthPayload.prototype, "user", void 0);
AuthPayload = __decorate([
    (0, type_graphql_1.ObjectType)()
], AuthPayload);
let UserResolver = class UserResolver {
    me(ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = ctx.userdata) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId) {
                throw new graphql_1.GraphQLError('No user found');
            }
            return ctx.prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
        });
    }
    signupUser(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield ctx.prisma.user.findUnique({
                where: {
                    email: args.email
                }
            });
            if (userExists) {
                throw new graphql_1.GraphQLError('User already exists');
            }
            const password = yield bcryptjs_1.default.hash(args.password, 10);
            const nameFromEmail = args.email.split('@')[0];
            const user = yield ctx.prisma.user.create({
                data: Object.assign(Object.assign({}, args), { password, name: nameFromEmail }),
            });
            const { token } = yield (0, IssueJWTPair_1.issueJwt)(user.id);
            return {
                user,
                token,
            };
        });
    }
    loginUser(args, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(args, 'args');
            const user = yield ctx.prisma.user.findUnique({
                where: {
                    email: args.email
                }
            });
            if (!user) {
                throw new graphql_1.GraphQLError('No such user found');
            }
            const valid = yield bcryptjs_1.default.compare(args.password, user.password);
            if (!valid) {
                throw new graphql_1.GraphQLError('Invalid password or email');
            }
            const { token } = yield (0, IssueJWTPair_1.issueJwt)(user.id);
            ctx.res.cookie('access-token', token, { httpOnly: true, maxAge: 2000, path: process.env.REQ_URL });
            return {
                user,
                token,
            };
        });
    }
    deleteAllUsers(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ctx.prisma.animeList.deleteMany({
                    where: {
                        user: {
                            every: {
                                id: {
                                    not: undefined
                                }
                            }
                        },
                    },
                });
                yield ctx.prisma.user.deleteMany();
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
    }
    logout(ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = ctx.userdata) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId) {
                throw new graphql_1.GraphQLError('No user found');
            }
            return true;
        });
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Authorized)(Role_1.Role.USER),
    (0, type_graphql_1.Query)((returns) => User_1.User),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => AuthPayload),
    __param(0, (0, type_graphql_1.Arg)('args')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signupUser", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => AuthPayload),
    __param(0, (0, type_graphql_1.Arg)('args')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteAllUsers", null);
__decorate([
    (0, type_graphql_1.Authorized)(Role_1.Role.USER, Role_1.Role.ADMIN),
    (0, type_graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], UserResolver);
// export class UserResolver {
//  @FieldResolver()
//  async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[] | null> {
//   return ctx.prisma.user
//       .findUnique({
//        where: {
//         id: user.id,
//        },
//       })
//       .posts()
//  }
//
//
//  @Query(() => [User])
//  async allUsers(@Ctx() ctx: Context) {
//   return ctx.prisma.user.findMany()
//  }
//
//  @Query((returns) => [Post], { nullable: true })
//  async draftsByUser(
//      @Arg('userUniqueInput') userUniqueInput: UserUniqueInput,
//      @Ctx() ctx: Context,
//  ) {
//   return ctx.prisma.user
//       .findUnique({
//        where: {
//         id: userUniqueInput.id || undefined,
//         email: userUniqueInput.email || undefined,
//        },
//       })
//       .posts({
//        where: {
//         published: false,
//        },
//       })
//  }
// }
