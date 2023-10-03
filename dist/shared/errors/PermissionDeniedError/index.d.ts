import { UseCaseError } from '@shared/core/errors/UseCaseError';
export declare class PermissionDeniedError extends Error implements UseCaseError {
    statusCode: number;
    constructor();
}
