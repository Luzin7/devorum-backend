import { UniqueId } from '../UniqueId'

export abstract class Entity<T> {
  private _id: UniqueId
  protected props: T

  protected constructor(props: T, id?: UniqueId) {
    this.props = props
    this._id = id ?? new UniqueId()
  }

  get id(): UniqueId {
    return this._id
  }
}
