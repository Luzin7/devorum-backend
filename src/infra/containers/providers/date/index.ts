import { container } from 'tsyringe'
import { Providers } from '../Providers'
import { DateDayJsProvider } from '@providers/date/implementations/DateDayJsProvider'

container.registerSingleton(Providers.Date, DateDayJsProvider)
