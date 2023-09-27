import { randomUUID } from 'node:crypto'

export class UniqueId {
  private value: string

  constructor(id?: string) {
    this.value = id ?? randomUUID()
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  equals(id: UniqueId) {
    return this.value === id.toString()
  }
}
