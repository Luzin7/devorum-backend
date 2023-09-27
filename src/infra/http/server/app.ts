import 'reflect-metadata'
import 'dotenv/config'
import '@infra/containers/index'
import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ZodError } from 'zod'
import { statusCodeMapper } from '../statusCode/statusCodeMapper'
import { fromZodError } from 'zod-validation-error'
import { env } from '@env/index'
import { routes } from '../routes'

const app = express()
const corsOptions = {
  origin: process.env.DEV_URL,
}
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof ZodError) {
    const zodErr = fromZodError(err)

    if (env.NODE_ENV === 'dev') console.log(zodErr)

    return res.status(statusCodeMapper.BadRequest).json({
      error: zodErr,
      statusCode: statusCodeMapper.BadRequest,
      message: 'Cant be validate input user infos.',
    })
  }

  return res.status(statusCodeMapper.InternalServerError).json({
    message: 'Internal server error',
    statusCode: statusCodeMapper.InternalServerError,
  })
})

app.use(routes)

export default app
