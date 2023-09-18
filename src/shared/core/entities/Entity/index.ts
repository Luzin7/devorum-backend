import { UniqueId } from '../UniqueId'

export class Entity<T> {
  private id: UniqueId
  private props: T

  protected constructor(props: T, id?: UniqueId) {
    this.props = props
    this.id = id ?? new UniqueId()
  }
}
