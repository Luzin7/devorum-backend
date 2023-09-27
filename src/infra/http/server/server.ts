import { env } from '@env/index'
import app from './app'
import 'infra/database/createConnection'
const { PORT } = env

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
