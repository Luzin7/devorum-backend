import { Entity } from '../Entity';
import { DomainEvents } from '@shared/core/events/DomainEvents';
export class AggregateRoot extends Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        DomainEvents.markAggregateForDispatch(this);
    }
    clearEvents() {
        this._domainEvents = [];
    }
}
//# sourceMappingURL=index.js.map