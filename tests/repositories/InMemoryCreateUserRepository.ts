import { Users } from "../../src/prisma/models/Users"
import { CreateUserData, CreateUserRepository } from "../../src/prisma/repositories/CreateUserRepository"

class InMemoryCreateUserRepository implements CreateUserRepository {

    public user: Users[] = []

    async findByEmail(email: string): Promise<Boolean> {
        const emailAlreadyExist = this.user.find(user => user.email === email)
        return emailAlreadyExist ? true : false
    }

    async findByUsername(username: string): Promise<Boolean> {
        const emailAlreadyExist = this.user.find(user => user.username === username)
        return emailAlreadyExist ? true : false
    }

    async create(data: CreateUserData): Promise<void> {
        this.user.push({
            ...data,
            id: '',
            created_at: new Date(),
            updated_at: new Date()
        })
    }
}

export {
    InMemoryCreateUserRepository
}

