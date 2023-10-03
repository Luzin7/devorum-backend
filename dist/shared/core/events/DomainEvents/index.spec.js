"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateRoot_1 = require("@shared/core/entities/AggregateRoot");
const _1 = require(".");
class CustomAggregateCreated {
    constructor(customAggregate) {
        this.customAggregate = customAggregate;
        this.ocurredAt = new Date();
    }
    getAggregateId() {
        return this.customAggregate.id;
    }
}
class CustomAggregate extends AggregateRoot_1.AggregateRoot {
    static create() {
        const customAggregate = new CustomAggregate(null);
        customAggregate.addDomainEvent(new CustomAggregateCreated(customAggregate));
        return customAggregate;
    }
}
describe('domain events', () => {
    it('should be able to dispatch and listen domain events', () => {
        const callbackSpy = vi.fn();
        _1.DomainEvents.register(CustomAggregateCreated.name, callbackSpy);
        const customAggregate = CustomAggregate.create();
        expect(customAggregate.domainEvents).toHaveLength(1);
        _1.DomainEvents.dispatchEventsForAggregate(customAggregate.id);
        expect(callbackSpy).toBeCalled();
        expect(customAggregate.domainEvents).toHaveLength(0);
    });
});
//# sourceMappingURL=index.spec.js.map