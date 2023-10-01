import { container } from 'tsyringe'
import { OnCommentCreated } from '@module/notifications/subscribers/onCommentCreated'

container.resolve(OnCommentCreated)
