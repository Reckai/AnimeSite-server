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
exports.AnimeList = exports.AnimeStatus = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../User/User");
const Anime_1 = require("../Anime");
var AnimeStatus;
(function (AnimeStatus) {
    AnimeStatus["WATCHING"] = "WATCHING";
    AnimeStatus["COMPLETED"] = "COMPLETED";
    AnimeStatus["DELAYED"] = "DELAYED";
    AnimeStatus["DROPPED"] = "DROPPED";
    AnimeStatus["PLANNED"] = "PLANNED";
})(AnimeStatus || (exports.AnimeStatus = AnimeStatus = {}));
(0, type_graphql_1.registerEnumType)(AnimeStatus, {
    name: 'AnimeStatus',
    description: 'Статусы аниме в списке пользователя',
});
let AnimeList = class AnimeList {
};
exports.AnimeList = AnimeList;
__decorate([
    (0, type_graphql_1.Field)((type) => type_graphql_1.ID),
    __metadata("design:type", String)
], AnimeList.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => AnimeStatus),
    __metadata("design:type", String)
], AnimeList.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    __metadata("design:type", User_1.User)
], AnimeList.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Anime_1.Anime),
    __metadata("design:type", Anime_1.Anime)
], AnimeList.prototype, "anime", void 0);
exports.AnimeList = AnimeList = __decorate([
    (0, type_graphql_1.ObjectType)()
], AnimeList);
