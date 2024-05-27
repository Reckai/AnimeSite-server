"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const type_graphql_1 = require("type-graphql");
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
(0, type_graphql_1.registerEnumType)(Role, {
    name: 'UsersRoles', description: 'Users roles in the system',
});
