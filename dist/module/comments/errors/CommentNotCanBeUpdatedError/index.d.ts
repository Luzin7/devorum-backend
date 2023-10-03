import { UseCaseError } from '@shared/core/errors/UseCaseError';
export declare class CommentNotCanBeUpdatedError extends Error implements UseCaseError {
    statusCode: number;
    constructor();
}
