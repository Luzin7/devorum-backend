"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const Providers_1 = require("../Providers");
const AuthJWTProvider_1 = require("@providers/auth/implementations/AuthJWTProvider");
tsyringe_1.container.registerSingleton(Providers_1.Providers.Auth, AuthJWTProvider_1.AuthJWTProvider);
//# sourceMappingURL=index.js.map