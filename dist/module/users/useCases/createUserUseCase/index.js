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
exports.CreateUserUseCase = void 0;
const Injectable_1 = require("@infra/containers/Injectable");
const User_1 = require("@module/users/entities/User");
const UserAlreadyExitesError_1 = require("@module/users/errors/UserAlreadyExitesError");
const UsersRepository_1 = require("@module/users/repositories/contracts/UsersRepository");
const Either_1 = require("@shared/core/errors/Either");
const CryptographyProvider_1 = require("@providers/cryptography/contracts/CryptographyProvider");
const tsyringe_1 = require("tsyringe");
let CreateUserUseCase = class CreateUserUseCase {
    constructor(usersRepository, cryptographyProvider) {
        this.usersRepository = usersRepository;
        this.cryptographyProvider = cryptographyProvider;
    }
    async execute({ email, name, password }) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            return (0, Either_1.left)(new UserAlreadyExitesError_1.UserAlreadyExitesError());
        }
        const { hash, salt } = await this.cryptographyProvider.hashCreator(password);
        const user = User_1.User.create({
            email,
            name,
            password: hash,
            salt,
        });
        await this.usersRepository.create(user);
        return (0, Either_1.right)({
            user,
        });
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Injectable_1.Injectable.Repositories.Users)),
    __param(1, (0, tsyringe_1.inject)(Injectable_1.Injectable.Providers.Cryptography)),
    __metadata("design:paramtypes", [UsersRepository_1.UsersRepository,
        CryptographyProvider_1.CryptographyProvider])
], CreateUserUseCase);
//# sourceMappingURL=index.js.map