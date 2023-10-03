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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessionUseCase = void 0;
const Injectable_1 = require("@infra/containers/Injectable");
const WrongCredentialsError_1 = require("@module/users/errors/WrongCredentialsError");
const UsersRepository_1 = require("@module/users/repositories/contracts/UsersRepository");
const Either_1 = require("@shared/core/errors/Either");
const AuthProvider_1 = require("@providers/auth/contracts/AuthProvider");
const CryptographyProvider_1 = require("@providers/cryptography/contracts/CryptographyProvider");
const tsyringe_1 = require("tsyringe");
let CreateSessionUseCase = class CreateSessionUseCase {
    constructor(cryptographyProvider, usersRepository, authProvider) {
        this.cryptographyProvider = cryptographyProvider;
        this.usersRepository = usersRepository;
        this.authProvider = authProvider;
    }
    async execute({ email, password }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            return (0, Either_1.left)(new WrongCredentialsError_1.WrongCredentialsError());
        }
        const passwordIsValid = await this.cryptographyProvider.hashComparer({
            hash: user.password,
            salt: user.salt,
            plainText: password,
        });
        if (!passwordIsValid) {
            return (0, Either_1.left)(new WrongCredentialsError_1.WrongCredentialsError());
        }
        const accessToken = await this.authProvider.encrypt(user.id.toString());
        const refreshToken = await this.authProvider.encrypt(user.id.toString(), 'refresh');
        return (0, Either_1.right)({
            user,
            accessToken,
            refreshToken,
        });
    }
};
exports.CreateSessionUseCase = CreateSessionUseCase;
exports.CreateSessionUseCase = CreateSessionUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Injectable_1.Injectable.Providers.Cryptography)),
    __param(1, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Users)),
    __param(2, (0, tsyringe_1.inject)(Injectable_1.Injectable.Providers.Auth)),
    __metadata("design:paramtypes", [CryptographyProvider_1.CryptographyProvider,
        UsersRepository_1.UsersRepository,
        AuthProvider_1.AuthProvider])
], CreateSessionUseCase);
//# sourceMappingURL=index.js.map