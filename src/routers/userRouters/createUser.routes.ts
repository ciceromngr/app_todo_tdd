import { Router } from "express";
import { CreateUserCompose } from "../../useCases/usersUseCase/createUser";

const createUserRouter = Router()
const { compose } = new CreateUserCompose()

createUserRouter.post('/user/register', async (req, res) => {
    const dataBody = {
        body: req.body
    }
    const { body, statusCode } = await compose().handle(dataBody)
    return res.status(statusCode).json(body)
})

export default createUserRouter