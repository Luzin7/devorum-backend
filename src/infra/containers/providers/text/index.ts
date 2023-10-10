import { container } from 'tsyringe'
import { Providers } from '../Providers'
import { TextImplementedProvider } from '@providers/text/implementations/TextImplementedProvider'

container.registerSingleton(Providers.Text, TextImplementedProvider)
