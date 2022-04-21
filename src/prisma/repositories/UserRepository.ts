export interface CreateUserData {
    name: string
    username: string
    email: string
    password: string
}

export interface UserRepository {
    create(data: CreateUserData): Promise<void>
    findByEmail(email: string): Promise<Boolean>
    findByUsername(username: string): Promise<Boolean>
}