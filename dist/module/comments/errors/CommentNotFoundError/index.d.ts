import { UseCaseError } from '@shared/core/errors/UseCaseError';
export declare class CommentNotFoundError extends Error implements UseCaseError {
    statusCode: number;
    constructor();
}
