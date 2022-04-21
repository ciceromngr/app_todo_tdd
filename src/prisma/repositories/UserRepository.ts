export interface CreateUserData {
    name: string
    username: string
    email: string
    password: string
}

export interface UserRepository {
    create(data: CreateUserData): Promise<void>
    emailIsExist(email: string): Promise<Boolean>
    usernameIsExist(username: string): Promise<Boolean>
}