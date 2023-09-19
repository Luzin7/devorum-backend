import { Entity } from '@shared/core/entities/Entity'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Optional } from '@shared/core/types/optional'

interface UserProps {
  createdAt: Date
  name: string
  password: string
  salt: string
  email: string
}

export class User extends Entity<UserProps> {
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
