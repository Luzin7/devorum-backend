import { Request, Response, Router } from 'express'

const makeServerOnRoute = Router()

makeServerOnRoute.get('/ping', (req: Request, res: Response) => {
  return res.send('Pong')
})

export { makeServerOnRoute }
