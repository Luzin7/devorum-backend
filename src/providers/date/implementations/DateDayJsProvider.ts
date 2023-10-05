import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { DateProvider } from '../contracts/DateProvider'

export class DateDayJsProvider implements DateProvider {
  constructor() {
    dayjs.extend(utc)
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }
}
