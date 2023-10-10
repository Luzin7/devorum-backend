import { htmlToText } from 'html-to-text'
import { TextProvider } from '../contracts/TextProvider'

export class TextImplementedProvider extends TextProvider {
  getTextOfHTML(html: string): string {
    const text = htmlToText(html)

    return text
  }
}
