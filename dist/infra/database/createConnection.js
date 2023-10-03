"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const index_1 = require("@env/index");
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    errorFormat: 'colorless',
    log: index_1.env.NODE_ENV === 'dev' ? ['query'] : [],
});
exports.prisma
    .$connect()
    .then(() => console.log('database is conectado'))
    .catch((error) => console.error(error));
//# sourceMappingURL=createConnection.js.map