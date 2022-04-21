import { PrismaUserRepository } from "../../../prisma/repositories/implementations/PrismaUserRepository";
import { Crypter } from "../../../utils/helpers/Crypter";
import { EmailValidator } from "../../../utils/helpers/EmailValidator";
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";

export class CreateUserCompose {
    public compose() {
        const prismaUserRepository = new PrismaUserRepository()
        const crypter = new Crypter()
        const emailValidator = new EmailValidator()
        const createUserUseCase = new CreateUserUseCase({
            userRepository: prismaUserRepository,
            crypter,
            emailValidator
        })
        const createUserController = new CreateUserController(createUserUseCase)
        return createUserController
    }
}