import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { DomainEvent } from '../DomainEvent'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { DomainEvents } from '.'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private customAggregate: CustomAggregate // eslint-disable-line

  constructor(customAggregate: CustomAggregate) {
    this.customAggregate = customAggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueId {
    return this.customAggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const customAggregate = new CustomAggregate(null)

    customAggregate.addDomainEvent(new CustomAggregateCreated(customAggregate))

    return customAggregate
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen domain events', () => {
    const callbackSpy = vi.fn()

    // Registra um evento a ser disparado quando uma "resposta for criada"
    DomainEvents.register(CustomAggregateCreated.name, callbackSpy)

    // Cria uma "resposta" no nível de domínio da aplicação (sem camada de persistência)
    const customAggregate = CustomAggregate.create()

    // Espera que o evento tenha sido registrado
    expect(customAggregate.domainEvents).toHaveLength(1)

    // Momento em que a "resposta" é salva na camada de persistência e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(customAggregate.id)

    expect(callbackSpy).toBeCalled()
    expect(customAggregate.domainEvents).toHaveLength(0)
  })
})
