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
exports.AnimeResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const Anime_1 = require("./Anime");
const AnimeList_1 = require("./AnimeList/AnimeList");
let AnimeListStatusDistribution = class AnimeListStatusDistribution {
};
__decorate([
    (0, type_graphql_1.Field)(type => AnimeList_1.AnimeStatus),
    __metadata("design:type", String)
], AnimeListStatusDistribution.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => Number),
    __metadata("design:type", Number)
], AnimeListStatusDistribution.prototype, "count", void 0);
AnimeListStatusDistribution = __decorate([
    (0, type_graphql_1.ObjectType)()
], AnimeListStatusDistribution);
let AnimeResolver = class AnimeResolver {
    userWatchListStatusDistributions(anime, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeLists = yield ctx.prisma.animeList.groupBy({
                by: ['status'], where: {
                    anime: {
                        some: {
                            id: anime.id,
                        },
                    }
                }, _count: {
                    _all: true,
                },
            });
            return animeLists.map((group) => ({
                count: group._count._all, status: group.status,
            }));
        });
    }
    allAnimes(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx.prisma.anime.findMany({
                include: {
                    genres: true, studios: true, poster: true, animeLists: true, _count: { select: { animeLists: true } }
                }
            });
        });
    }
    anime(slug, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.userId, 'userId');
            return ctx.prisma.anime.findUnique({
                where: {
                    slug: slug
                }, include: {
                    genres: true, studios: true, poster: true, animeLists: ctx.userId && slug ? {
                        where: {
                            AND: [{ anime: {
                                        some: {
                                            slug
                                        }
                                    } },
                                {
                                    user: {
                                        some: {
                                            id: ctx.userId
                                        }
                                    }
                                }]
                        }
                    } : undefined
                }
            });
        });
    }
};
exports.AnimeResolver = AnimeResolver;
__decorate([
    (0, type_graphql_1.FieldResolver)(returns => [AnimeListStatusDistribution]),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Anime_1.Anime, Object]),
    __metadata("design:returntype", Promise)
], AnimeResolver.prototype, "userWatchListStatusDistributions", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Anime_1.Anime]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnimeResolver.prototype, "allAnimes", null);
__decorate([
    (0, type_graphql_1.Query)(() => Anime_1.Anime),
    __param(0, (0, type_graphql_1.Arg)('slug')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AnimeResolver.prototype, "anime", null);
exports.AnimeResolver = AnimeResolver = __decorate([
    (0, type_graphql_1.Resolver)(Anime_1.Anime)
], AnimeResolver);
