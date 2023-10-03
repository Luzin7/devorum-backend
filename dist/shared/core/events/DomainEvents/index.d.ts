import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueId } from '@shared/core/entities/UniqueId';
type DomainEventCallback = (event: any) => void;
export declare class DomainEvents {
    private static handlersMap;
    private static markedAggregates;
    static markAggregateForDispatch(aggregate: AggregateRoot<unknown>): void;
    private static dispatchAggregateEvents;
    private static removeAggregateFromMarkedDispatchList;
    private static findMarkedAggregateByID;
    static dispatchEventsForAggregate(id: UniqueId): void;
    static register(eventClassName: string, callback: DomainEventCallback): void;
    static clearHandlers(): void;
    static clearMarkedAggregates(): void;
    private static dispatch;
}
export {};
