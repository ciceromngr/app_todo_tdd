import { PrismaCreateUserRepository } from "../../../prisma/repositories/implementations/PrismaCreateUserRepository";
import { Crypter } from "../../../utils/helpers/Crypter";
import { EmailValidator } from "../../../utils/helpers/EmailValidator";
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";

export class CreateUserCompose {
    public compose() {
        const prismaCreateUserRepository = new PrismaCreateUserRepository()
        const crypter = new Crypter()
        const emailValidator = new EmailValidator()
        const createUserUseCase = new CreateUserUseCase({
            createUserRepository: prismaCreateUserRepository,
            crypter,
            emailValidator
        })
        const createUserController = new CreateUserController(createUserUseCase)
        return createUserController
    }
}