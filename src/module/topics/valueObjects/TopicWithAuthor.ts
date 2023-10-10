import { UniqueId } from '@shared/core/entities/UniqueId'
import { ValueObject } from '@shared/core/entities/ValueObject'
import { Optional } from '@shared/core/types/optional'

interface TopicWithAuthorProps {
  topicId: UniqueId
  authorId: UniqueId
  authorName: string
  topicContent: string
  topicAssertion?: string | null
  topicTitle: string
  topicCreatedAt: Date
  topicUpdatedAt: Date | null
  numberOfComments: number
}

export class TopicWithAuthor extends ValueObject<TopicWithAuthorProps> {
  static create(props: Optional<TopicWithAuthorProps, 'numberOfComments'>) {
    return new TopicWithAuthor({
      ...props,
      numberOfComments: props.numberOfComments ?? 0,
    })
  }

  get topicId() {
    return this.props.topicId
  }

  get topicTitle() {
    return this.props.topicTitle
  }

  get authorId() {
    return this.props.authorId
  }

  get topicContent() {
    return this.props.topicContent
  }

  get topicAssertion() {
    return this.props.topicAssertion
  }

  get topicCreatedAt() {
    return this.props.topicCreatedAt
  }

  get topicUpdatedAt() {
    return this.props.topicUpdatedAt
  }

  get authorName() {
    return this.props.authorName
  }

  get numberOfComments() {
    return this.props.numberOfComments
  }

  makeAssertionWithExternal(callback: (raw: string) => string) {
    const text = callback(this.topicContent)
      .split('')
      .map((char, i, txt) => {
        if (char === '\n') return ''

        if (char === ' ' && txt[i + 1] === ' ') return ''

        return char
      })
      .join('')

    const wordsOnText = text.split(' ')
    const textSliced = wordsOnText.slice(0, 48).join(' ')
    const assertion =
      wordsOnText.length > 48 ? textSliced.concat('...') : textSliced

    this.props.topicAssertion = assertion
  }
}
