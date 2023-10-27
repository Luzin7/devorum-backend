export abstract class TextProvider {
  abstract getTextOfHTML(html: string): string
  abstract htmlIsValid(html: string): boolean
}
