import { InMemoryUserRepository } from "../../../../tests/repositories/InMemoryUserRepository"
import { Crypter } from "../../../utils/helpers/Crypter"
import { EmailValidator } from "../../../utils/helpers/EmailValidator"
import { CreateUserController } from "./createUserController"
import { CreateUserUseCase } from "./createUserUseCase"

const makeSut = () => {
    const inMemoryRepository = new InMemoryUserRepository()
    const crypter = new Crypter()
    const emailValidator = new EmailValidator()
    const createUserUseCase = new CreateUserUseCase({
        userRepository: inMemoryRepository,
        crypter,
        emailValidator
    })
    const sut = new CreateUserController(createUserUseCase)

    return {
        sut
    }
}

describe('Create User Controller', () => {
    const dataRequest = {
        body: {
            name: 'userName',
            username: 'userUsername',
            email: 'user_email@email.com',
            password: 'userPassword'
        }
    }

    it('should be able to create a new user', async () => {
        const { sut } = makeSut()
        const response = sut.handle(dataRequest)
        expect(response).resolves.not.toThrow()
        expect(await response).toEqual({
            body: 'Created!',
            statusCode: 201
        })
    })

    it('should NOT be able to create a new user with credentials invalid', async () => {
        const { sut } = makeSut()
        const response = await sut.handle({
            body: {
                ...dataRequest.body,
                name: ''
            }
        })
        expect(response.body).toEqual({
             message: 'Credentials invalid', statusCode: 401 
        })
    })

    it('should NOT be able to create a new user with invalid email', async () => {
        const { sut } = makeSut()
        const response = await sut.handle({
            body: {
                ...dataRequest.body,
                email: 'invalidEmail_'
            }
        })
        expect(response.body).toEqual({
            message: 'Check if the email is correct', statusCode: 401
        })
    })

    it('should NOT be able to create a new user with email or username already exist', async () => {
        const { sut } = makeSut()
        await expect(sut.handle(dataRequest)).resolves.not.toThrow()

        const respEmailAlreadyExist = await sut.handle(dataRequest)
        expect(respEmailAlreadyExist.body).toEqual({
            message: 'Email or Username Already Exist!',
            statusCode: 401
        })

        const respUsernameAlreadyExist = await sut.handle({
            body: {
                ...dataRequest.body,
                email: 'user_email_valid@email.com'
            }
        })
        expect(respUsernameAlreadyExist.body).toEqual({
            message: 'Email or Username Already Exist!',
            statusCode: 401
        })

    })
})