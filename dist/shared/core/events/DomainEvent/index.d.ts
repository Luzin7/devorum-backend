import { UniqueId } from '@shared/core/entities/UniqueId';
export interface DomainEvent {
    ocurredAt: Date;
    getAggregateId(): UniqueId;
}
