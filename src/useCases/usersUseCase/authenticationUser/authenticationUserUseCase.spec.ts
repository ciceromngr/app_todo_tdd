import 'dotenv/config'
import { InMemoryUserRepository } from "../../../../tests/repositories/InMemoryUserRepository"
import { AuthenticationUserUseCase } from "./authenticationUserUseCase"
const makeSut = () => {
    const inMemoryRepository = new InMemoryUserRepository()
    const sut = new AuthenticationUserUseCase(inMemoryRepository)
    return { sut, inMemoryRepository }
}

describe('Authentication User Use Case', () => {

    it('should be possible to effect to login', async () => {

        const { sut, inMemoryRepository } = makeSut()
        await inMemoryRepository.create({
            name: 'test',
            email: 'test@test.com',
            password: '$2b$10$31krEWty57ui.q2PhzWl0eKt3gR3GFXWi86oABezyIcbU4IyVIwRG',
            username: 'testing'
        })
        const token = await sut.execute({
            password: '123123',
            username: 'testing'
        })
        
        expect(token).toBeTruthy()
    })
})