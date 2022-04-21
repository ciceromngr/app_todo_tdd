import { InMemoryUserRepository } from "../../../../tests/repositories/InMemoryUserRepository";
import { ErrorCredentials } from "../../../middlewares/err/ErrorCredentials";
import { ErrorFormat } from "../../../middlewares/err/ErrorFormat";
import { ErrorUserAlreadyExist } from '../../../middlewares/err/ErrorUserAlreadyExist';
import { Crypter } from "../../../utils/helpers/Crypter";
import { EmailValidator } from "../../../utils/helpers/EmailValidator";
import { CreateUserUseCase } from "./createUserUseCase";

const makesut = () => {
    const inMemoryRepository = new InMemoryUserRepository()
    const emailValidator = new EmailValidator()
    const crypter = new Crypter()
    const sut = new CreateUserUseCase({
        userRepository: inMemoryRepository,
        emailValidator,
        crypter
    })

    return {
        inMemoryRepository,
        sut,
        emailValidator,
        crypter
    }
}

describe('Create User Use Case', () => {
    const userReq = {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        username: 'anyUserName'
    }

    it('should be able to create a new user', async () => {
        const { sut, inMemoryRepository } = makesut()
        await expect(sut.create(userReq)).resolves.not.toThrow()

        expect(inMemoryRepository.user).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'anyName',
                    email: 'anyEmail@email.com',
                })
            ])
        )
    })

    it('should NOT be able to create a new user with invalid email', async () => {
        const { sut, inMemoryRepository } = makesut()
        const invalidUserParasm = {
            name: 'validName',
            email: 'invalidEmail',
            password: 'validPassword',
            username: 'validUserName'
        }
        await expect(sut.create(invalidUserParasm)).rejects.toEqual(new ErrorFormat({ message: 'Check if the email is correct', statusCode: 401 }))
        expect(inMemoryRepository.user).toEqual([])
    })

    it('should NOT be able to create a new user with email or username is already exist', async () => {
        const { sut } = makesut()

        await expect(sut.create(userReq)).resolves.not.toThrow()

        await expect(sut.create(userReq)).rejects.toEqual(new ErrorUserAlreadyExist({
            message: 'Email or Username Already Exist!',
            statusCode: 401
        }))

        await expect(sut.create({
            ...userReq,
            email: 'other_email@mail.com'
        })).rejects.toEqual(new ErrorUserAlreadyExist({
            message: 'Email or Username Already Exist!',
            statusCode: 401
        }))
    })

    it('should NOT be able to create a new user with invalid params', async () => {
        const { sut, inMemoryRepository } = makesut()
        const invalidUserParams = {
            name: '',
            email: '',
            password: '',
            username: ''
        }
        await expect(sut.create(invalidUserParams)).rejects.toEqual(new ErrorCredentials({
            message: 'Credentials invalid',
            statusCode: 401
        }))
        expect(inMemoryRepository.user).toEqual([])
    })

    it('should be able to hashed password correct', async () => {
        const { sut, crypter, inMemoryRepository} = makesut()
        
        await expect(sut.create(userReq)).resolves.not.toThrow()

        expect(inMemoryRepository.user).toEqual(expect.arrayContaining([
            expect.objectContaining({
                password: crypter.valueHashed
            })
        ]))
    })
})