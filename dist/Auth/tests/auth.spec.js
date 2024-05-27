"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
vitest_1.test.todo('User can successfully login');
vitest_1.test.todo('User gets 403 on invalid credentials');
vitest_1.test.todo('User gets 401 on expired token');
vitest_1.test.todo('User can create new access token with refresh token');
vitest_1.test.todo('User can use refresh token only once');
vitest_1.test.todo('Refresh token is invalidated after logout');
vitest_1.test.todo('Multiple refresh tokens are valid');
