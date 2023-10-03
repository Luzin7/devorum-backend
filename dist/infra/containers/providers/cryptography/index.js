"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const Providers_1 = require("../Providers");
const CryptographyCryptoProvider_1 = require("@providers/cryptography/implementations/CryptographyCryptoProvider");
tsyringe_1.container.registerSingleton(Providers_1.Providers.Cryptography, CryptographyCryptoProvider_1.CryptographyCryptoProvider);
//# sourceMappingURL=index.js.map