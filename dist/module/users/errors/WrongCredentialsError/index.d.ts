import { UseCaseError } from '@shared/core/errors/UseCaseError';
export declare class WrongCredentialsError extends Error implements UseCaseError {
    statusCode: number;
    constructor();
}
