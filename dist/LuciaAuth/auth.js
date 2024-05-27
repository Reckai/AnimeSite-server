"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lucia = exports.client = void 0;
const client_1 = require("@prisma/client");
const lucia_1 = require("lucia");
const index_1 = require("@lucia-auth/adapter-prisma/dist/index");
exports.client = new client_1.PrismaClient();
const adapter = new index_1.PrismaAdapter(exports.client.session, exports.client.user);
exports.lucia = new lucia_1.Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.name
        };
    }
});
