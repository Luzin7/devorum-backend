import { UseCaseError } from '@shared/core/errors/UseCaseError';
export declare class UserNotFoundError extends Error implements UseCaseError {
    statusCode: number;
    constructor();
}
