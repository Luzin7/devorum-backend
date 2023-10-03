import { UseCaseError } from '@shared/core/errors/UseCaseError';
export declare class TopicNotFoundError extends Error implements UseCaseError {
    statusCode: number;
    constructor();
}
