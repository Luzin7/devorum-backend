import { container } from 'tsyringe'
import { Providers } from '../Providers'
import { CryptographyCryptoProvider } from 'providers/cryptography/implementations/CryptographyCryptoProvider'

container.registerSingleton(Providers.Cryptography, CryptographyCryptoProvider)
