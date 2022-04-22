import 'dotenv/config'
import { InMemoryUserRepository } from "../../../../tests/repositories/InMemoryUserRepository"
import { AuthenticationUserController } from './authenticationUserController'
import { AuthenticationUserUseCase } from "./authenticationUserUseCase"
const makeSut = () => {
    const inMemoryRepository = new InMemoryUserRepository()
    const authenticationUseCase = new AuthenticationUserUseCase(inMemoryRepository)
    const sut = new AuthenticationUserController(authenticationUseCase)
    return { sut, inMemoryRepository }
}

describe('Authentication User Controller', () => {

    const requestBody = {
        body: {
            username: 'testing',
            password: '123123'
        }
    }

    it('should be possible to effect to login', async () => {

        const { sut, inMemoryRepository } = makeSut()
        await inMemoryRepository.create({
            name: 'test',
            email: 'test@test.com',
            password: '$2b$10$31krEWty57ui.q2PhzWl0eKt3gR3GFXWi86oABezyIcbU4IyVIwRG',
            username: 'testing'
        })
        const token = await sut.handle(requestBody)

        expect(token).toBeTruthy()
    })

    it('should NOT be possible to effect to login with params invalid', async () => {
        const { sut } = makeSut()
        expect(await sut.handle({
            body: {
                username: '',
                password: ''
            }
        })).toEqual({
            body: {
                message: "Credentials invalid",
                statusCode: 401,
            },
            statusCode: 401
        })
    })

    it('should NOT be possible to effect to login with uername or password incorrect', async () => {
        const { sut, inMemoryRepository } = makeSut()
        await inMemoryRepository.create({
            name: 'test',
            email: 'test@test.com',
            password: '$2b$10$31krEWty57ui.q2PhzWl0eKt3gR3GFXWi86oABezyIcbU4IyVIwRG',
            username: 'testing'
        })

        expect(await sut.handle({
            body: {
                password: '123123',
                username: 'username_invalid'
            }
        })).toEqual({
            body: {
                message: 'Username invalids',
                statusCode: 401
            },
            statusCode: 401
        })

        expect(await sut.handle({
            body: {
                password: 'password_invalid',
                username: 'testing'
            }
        })).toEqual({
            body: {
                message: 'password invalids',
                statusCode: 401
            },
            statusCode: 401
        })
    })
})