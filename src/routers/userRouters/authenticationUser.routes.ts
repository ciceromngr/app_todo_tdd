import { Router } from "express";
import { AuthenticationUserCompose } from "../../useCases/usersUseCase/authenticationUser";

const authenticationUserRouter = Router()
const { compose } = new AuthenticationUserCompose()

authenticationUserRouter.post('/user/auth', async (req, res) => {
    const dataBody = {
        body: req.body
    }
    const { body, statusCode } = await compose().handle(dataBody)
    return res.status(statusCode).json(body)
})

export default authenticationUserRouter