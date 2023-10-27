import { htmlToText } from 'html-to-text'
import { TextProvider } from '../contracts/TextProvider'
import * as cheerio from 'cheerio'

const NotAcceptedTags = ['script']
const AcceptedAttrs = ['class', 'id']

interface CheerioType extends cheerio.Node {
  name: string
  attribs: {
    [x: string]: string
  }[]
  children: CheerioType[]
}

export class TextImplementedProvider extends TextProvider {
  getTextOfHTML(html: string): string {
    const text = htmlToText(html)

    return text
  }

  htmlIsValid(html: string) {
    const htmlObject = cheerio.load(html)

    let shouldBeContinueRunning = true
    let htmlIsValid = true

    function verifyIfIsValid(child: CheerioType) {
      if (shouldBeContinueRunning) {
        if (NotAcceptedTags.includes(child.name)) {
          console.log(child)

          shouldBeContinueRunning = false
          htmlIsValid = false
        }

        if (child.attribs) {
          Object.keys(child.attribs).forEach((key) => {
            if (!AcceptedAttrs.includes(key)) {
              shouldBeContinueRunning = false
              htmlIsValid = false
            }
          })
        }

        if (child.children && child.children[0]) {
          child.children.forEach((child) => verifyIfIsValid(child))
        }
      }
    }

    htmlObject._root.children.forEach((child) =>
      verifyIfIsValid(child as unknown as CheerioType),
    )

    return htmlIsValid
  }
}
