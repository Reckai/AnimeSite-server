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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const tq = __importStar(require("type-graphql"));
const context_1 = require("./context");
const cors_1 = __importDefault(require("cors"));
const AnimeResolver_1 = require("./AnimeResolver");
const AnimeListResolver_1 = require("./AnimeList/AnimeListResolver");
const UserResolver_1 = require("./User/UserResolver");
const CommentResolver_1 = require("./Comment/CommentResolver");
const AuthCheker_1 = require("./AuthCheker/AuthCheker");
const express4_1 = require("@apollo/server/express4");
const http_1 = __importDefault(require("http"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LuciaResolver_1 = require("./LuciaAuth/LuciaResolver");
const auth_1 = require("./LuciaAuth/auth");
const app = (0, express_1.default)();
const server1 = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield tq.buildSchema({
        resolvers: [AnimeResolver_1.AnimeResolver, AnimeListResolver_1.AnimeListResolver, UserResolver_1.UserResolver, CommentResolver_1.CommentResolver, LuciaResolver_1.LuciaResolver],
        scalarsMap: [{ type: graphql_1.GraphQLScalarType, scalar: graphql_scalars_1.DateTimeResolver }],
        validate: { forbidUnknownValues: false },
        authChecker: AuthCheker_1.authChecker
    });
    const httpServer = http_1.default.createServer(app);
    const server = new server_1.ApolloServer({ schema, plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })], });
    yield server.start();
    app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const sessionId = auth_1.lucia.readSessionCookie((_a = req.headers.cookie) !== null && _a !== void 0 ? _a : "");
        if (!sessionId) {
            res.locals.user = null;
            res.locals.session = null;
            return next();
        }
        const { session, user } = yield auth_1.lucia.validateSession(sessionId);
        if (session && session.fresh) {
            res.appendHeader("Set-Cookie", auth_1.lucia.createSessionCookie(session.id).serialize());
        }
        if (!session) {
            res.appendHeader("Set-Cookie", auth_1.lucia.createBlankSessionCookie().serialize());
        }
        res.locals.session = session;
        res.locals.user = user;
        return next();
    }));
    app.use('/', (0, cors_1.default)({
        origin: true, credentials: true
    }), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const token = req.headers.authorization || '';
            if (!token)
                return { prisma: context_1.context.prisma, res };
            const noBearer = token.replace('Bearer ', '');
            console.log(noBearer, 'noBearer');
            const userId = (_b = jsonwebtoken_1.default.decode(noBearer, { complete: true })) === null || _b === void 0 ? void 0 : _b.payload;
            return {
                prisma: context_1.context.prisma, token: noBearer, res, userId
            };
        })
    }));
    yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);
});
server1();
