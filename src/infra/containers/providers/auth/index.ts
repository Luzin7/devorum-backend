import { container } from 'tsyringe'
import { Providers } from '../Providers'
import { AuthJWTProvider } from 'providers/auth/implementations/AuthJWTProvider'

container.registerSingleton(Providers.Auth, AuthJWTProvider)
