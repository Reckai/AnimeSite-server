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
exports.Reply = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../User/User");
const Comment_1 = require("../Comment/Comment");
let Reply = class Reply {
};
exports.Reply = Reply;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Reply.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Reply.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1.User], { nullable: true }),
    __metadata("design:type", Array)
], Reply.prototype, "author", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Reply.prototype, "depth", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Reply.prototype, "parentId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Reply.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Reply.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Reply.prototype, "viewerCanDelete", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Reply.prototype, "viewerCanUpdate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Reply.prototype, "threadId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Comment_1.Comment]),
    __metadata("design:type", Array)
], Reply.prototype, "comments", void 0);
exports.Reply = Reply = __decorate([
    (0, type_graphql_1.ObjectType)()
], Reply);
