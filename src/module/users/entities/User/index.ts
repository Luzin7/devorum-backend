import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'

export interface UserProps {
  createdAt: Date
  name: string
  password: string
  salt: string
  email: string
}

export class User extends AggregateRoot<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueId) {
    const userProps: UserProps = {
      createdAt: props.createdAt ?? new Date(),
      name: props.name,
      password: props.password,
      salt: props.salt,
      email: props.email,
    }

    const user = new User(userProps, id)

    return user
  }

  get createdAt() {
    return this.props.createdAt
  }

  get name() {
    return this.props.name
  }

  get password() {
    return this.props.password
  }

  get salt() {
    return this.props.salt
  }

  get email() {
    return this.props.email
  }
}
