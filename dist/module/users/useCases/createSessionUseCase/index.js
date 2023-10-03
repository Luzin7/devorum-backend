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
import { Injectable } from '@infra/containers/Injectable';
import { WrongCredentialsError } from '@module/users/errors/WrongCredentialsError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { left, right } from '@shared/core/errors/Either';
import { AuthProvider } from '@providers/auth/contracts/AuthProvider';
import { CryptographyProvider } from '@providers/cryptography/contracts/CryptographyProvider';
import { inject, injectable } from 'tsyringe';
let CreateSessionUseCase = class CreateSessionUseCase {
    constructor(cryptographyProvider, usersRepository, authProvider) {
        this.cryptographyProvider = cryptographyProvider;
        this.usersRepository = usersRepository;
        this.authProvider = authProvider;
    }
    async execute({ email, password }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            return left(new WrongCredentialsError());
        }
        const passwordIsValid = await this.cryptographyProvider.hashComparer({
            hash: user.password,
            salt: user.salt,
            plainText: password,
        });
        if (!passwordIsValid) {
            return left(new WrongCredentialsError());
        }
        const accessToken = await this.authProvider.encrypt(user.id.toString());
        const refreshToken = await this.authProvider.encrypt(user.id.toString(), 'refresh');
        return right({
            user,
            accessToken,
            refreshToken,
        });
    }
};
CreateSessionUseCase = __decorate([
    injectable(),
    __param(0, inject(Injectable.Providers.Cryptography)),
    __param(1, inject(Injectable.Repositories.Users)),
    __param(2, inject(Injectable.Providers.Auth)),
    __metadata("design:paramtypes", [CryptographyProvider,
        UsersRepository,
        AuthProvider])
], CreateSessionUseCase);
export { CreateSessionUseCase };
//# sourceMappingURL=index.js.map