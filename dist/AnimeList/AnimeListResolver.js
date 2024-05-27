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
exports.AnimeListResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const AnimeList_1 = require("./AnimeList");
const graphql_1 = require("graphql");
let AnimeListInfo = class AnimeListInfo {
};
__decorate([
    (0, type_graphql_1.Field)(() => AnimeList_1.AnimeStatus),
    __metadata("design:type", String)
], AnimeListInfo.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], AnimeListInfo.prototype, "userCount", void 0);
AnimeListInfo = __decorate([
    (0, type_graphql_1.ObjectType)()
], AnimeListInfo);
let AnimeListResolver = class AnimeListResolver {
    getAnimeListInfo(animeId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const animeListInfo = yield ctx.prisma.animeList.groupBy({
                    by: ['status'], where: {
                        anime: {
                            some: {
                                id: animeId,
                            },
                        },
                    }, _count: {
                        status: true,
                    },
                });
                return animeListInfo.map((entry) => ({
                    status: entry.status,
                    userCount: entry._count.status,
                }));
            }
            catch (error) {
                console.error('Error fetching anime list info:', error);
                return null;
            }
        });
    }
    changeStatusOfAnime(animeId, userId, status, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                throw new graphql_1.GraphQLError("you must be logged in to query this schema", {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                });
            try {
                const existingAnimeList = yield ctx.prisma.animeList.findFirst({
                    where: {
                        anime: {
                            some: {
                                id: animeId
                            }
                        },
                        user: {
                            some: {
                                id: userId
                            }
                        }
                    }
                });
                if (existingAnimeList) {
                    yield ctx.prisma.animeList.update({
                        where: { id: existingAnimeList.id },
                        data: { status: status },
                    });
                    return true;
                }
                yield ctx.prisma.animeList.create({
                    data: {
                        anime: { connect: { id: animeId } },
                        user: { connect: { id: userId } },
                        status: status,
                    },
                });
                console.log(`AnimeList for anime with id ${animeId} created successfully.`);
                return true;
            }
            catch (error) {
                console.error(`Error creating AnimeList for anime with id ${animeId}: ${error}`);
                return false;
            }
        });
    }
};
exports.AnimeListResolver = AnimeListResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [AnimeListInfo], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('animeId')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AnimeListResolver.prototype, "getAnimeListInfo", null);
__decorate([
    (0, type_graphql_1.Authorized)(['ADMIN', 'USER']),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('animeId')),
    __param(1, (0, type_graphql_1.Arg)('userId')),
    __param(2, (0, type_graphql_1.Arg)('status', type => AnimeList_1.AnimeStatus)),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AnimeListResolver.prototype, "changeStatusOfAnime", null);
exports.AnimeListResolver = AnimeListResolver = __decorate([
    (0, type_graphql_1.Resolver)(AnimeList_1.AnimeList)
], AnimeListResolver);
;
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
//  @Mutation((returns) => User)
//  async signupUser(
//      @Arg('data') data: UserCreateInput,
//      @Ctx() ctx: Context,
//  ): Promise<User> {
//   const postData = data.posts?.map((post) => {
//    return { title: post.title, content: post.content || undefined }
//   })
//
//   return ctx.prisma.user.create({
//    data: {
//     email: data.email,
//     name: data.name,
//     posts: {
//      create: postData,
//     },
//    },
//   })
//  }
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
