import { Users } from "../../src/prisma/models/Users"
import { CreateUserData, UserRepository } from "../../src/prisma/repositories/UserRepository"

class InMemoryUserRepository implements UserRepository {

    public user: Users[] = []

    async emailIsExist(email: string): Promise<Boolean> {
        const emailAlreadyExist = this.user.find(user => user.email === email)
        return emailAlreadyExist ? true : false
    }

    async usernameIsExist(username: string): Promise<Boolean> {
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
    InMemoryUserRepository
}

