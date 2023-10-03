import { UseCaseError } from '@shared/core/errors/UseCaseError';
export declare class UserAlreadyExitesError extends Error implements UseCaseError {
    statusCode: number;
    constructor();
}
