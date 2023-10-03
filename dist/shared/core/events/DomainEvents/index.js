export class DomainEvents {
    static markAggregateForDispatch(aggregate) {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);
        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }
    static dispatchAggregateEvents(aggregate) {
        aggregate.domainEvents.forEach((event) => this.dispatch(event));
    }
    static removeAggregateFromMarkedDispatchList(aggregate) {
        const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
        this.markedAggregates.splice(index, 1);
    }
    static findMarkedAggregateByID(id) {
        return this.markedAggregates.find((aggregate) => aggregate.id.equals(id));
    }
    static dispatchEventsForAggregate(id) {
        const aggregate = this.findMarkedAggregateByID(id);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }
    static register(eventClassName, callback) {
        const wasEventRegisteredBefore = eventClassName in this.handlersMap;
        if (!wasEventRegisteredBefore) {
            this.handlersMap[eventClassName] = [];
        }
        this.handlersMap[eventClassName].push(callback);
    }
    static clearHandlers() {
        this.handlersMap = {};
    }
    static clearMarkedAggregates() {
        this.markedAggregates = [];
    }
    static dispatch(event) {
        const eventClassName = event.constructor.name;
        const isEventRegistered = eventClassName in this.handlersMap;
        if (isEventRegistered) {
            const handlers = this.handlersMap[eventClassName];
            handlers.forEach((handler) => handler(event));
        }
    }
}
DomainEvents.handlersMap = {};
DomainEvents.markedAggregates = [];
//# sourceMappingURL=index.js.map