import { UseCaseError } from '@shared/core/errors/UseCaseError';
export declare class NotificationNotFoundError extends Error implements UseCaseError {
    statusCode: number;
    constructor();
}
