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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anime = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const Genre_1 = require("./Genre");
const Poster_1 = require("./Poster");
const Studio_1 = require("./Studio");
const AnimeList_1 = require("./AnimeList/AnimeList");
let Anime = class Anime {
};
exports.Anime = Anime;
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID),
    __metadata("design:type", String)
], Anime.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], Anime.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], Anime.prototype, "licenseNameRu", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], Anime.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [Genre_1.Genre], { nullable: true }),
    __metadata("design:type", Array)
], Anime.prototype, "genres", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], Anime.prototype, "slug", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [Studio_1.Studio], { nullable: true }),
    __metadata("design:type", Array)
], Anime.prototype, "studios", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [Poster_1.Poster]),
    __metadata("design:type", Poster_1.Poster)
], Anime.prototype, "poster", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [AnimeList_1.AnimeList], { nullable: true }),
    __metadata("design:type", Array)
], Anime.prototype, "animeLists", void 0);
exports.Anime = Anime = __decorate([
    (0, type_graphql_1.ObjectType)()
], Anime);
