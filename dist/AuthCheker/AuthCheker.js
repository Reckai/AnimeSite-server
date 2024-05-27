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
exports.authChecker = void 0;
const type_graphql_1 = require("type-graphql");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Roles_1 = require("../Roles/Roles");
const authChecker = ({ context: { token, prisma } }) => __awaiter(void 0, void 0, void 0, function* () {
    // Здесь мы можем прочитать пользователя из контекста
    // и проверить его разрешения в базе данных против аргумента `roles`
    if (!token) {
        throw new type_graphql_1.AuthenticationError('Not authenticated');
    }
    const verify = jsonwebtoken_1.default.verify(token, process.env.AUTH_SECRET || '');
    if (!verify) {
        throw new type_graphql_1.AuthenticationError('Not authenticated');
    }
    const existingUser = yield prisma.user.findUnique({
        where: {
            id: verify
        }
    });
    if (!existingUser) {
        throw new type_graphql_1.AuthenticationError('Not authenticated');
    }
    return Roles_1.Roles.includes(existingUser.role);
    console.log(verify);
    // который приходит от декоратора `@Authorized`, например, ["ADMIN", "MODERATOR"]
    console.log(token);
    return true;
});
exports.authChecker = authChecker;
