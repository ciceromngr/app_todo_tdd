import { PrismaUserRepository } from "../../../prisma/repositories/implementations/PrismaUserRepository";
import { AuthenticationUserController } from "./authenticationUserController";
import { AuthenticationUserUseCase } from "./authenticationUserUseCase";

class AuthenticationUserCompose {
    public compose() {
        const prismaUserRepository = new PrismaUserRepository()
        const authenticationUserUseCase = new AuthenticationUserUseCase(prismaUserRepository)
        const authenticationUserController = new AuthenticationUserController(authenticationUserUseCase)
        return authenticationUserController
    }
}

export {
    AuthenticationUserCompose
};
