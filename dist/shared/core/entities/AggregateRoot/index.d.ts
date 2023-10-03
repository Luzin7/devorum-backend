import { DomainEvent } from '@shared/core/events/DomainEvent';
import { Entity } from '../Entity';
export declare abstract class AggregateRoot<Props> extends Entity<Props> {
    private _domainEvents;
    get domainEvents(): DomainEvent[];
    protected addDomainEvent(domainEvent: DomainEvent): void;
    clearEvents(): void;
}
