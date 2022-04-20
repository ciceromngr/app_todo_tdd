import express, { Express, NextFunction, Request, Response } from 'express'
import createUserRouter from './routers/userRouters/createUser.routes'

export const app = express()

class App {

    public server: Express

    constructor() {
        this.server = app
        this.middlewares()
        this.router()
        this.exceptionsHandles()
    }

    middlewares() {
        this.server.use(express.json())
    }

    router() {
        this.server.use(createUserRouter)
    }

    exceptionsHandles() {
        this.server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof Error) {
                return res.status(401).json({ error: err.message })
            }

            return res.status(500).json({ error: "Internal Server Error!" })
        })
    }

}
export default {
    app: new App().server
}