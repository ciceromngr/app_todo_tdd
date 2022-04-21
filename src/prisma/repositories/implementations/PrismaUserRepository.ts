import { Users } from "../../models/Users";
import { prismaClient } from "../../prismaClient";
import { CreateUserData, UserRepository } from "../UserRepository";

class PrismaUserRepository implements UserRepository {
    
    async findUserByUsername(username: string): Promise<Users | null> {
        const user = await prismaClient.user.findFirst({
            where: { username }
        })
        return user
    }

    async emailIsExist(email: string): Promise<Boolean> {
        const emailAlreadyExist = await prismaClient.user.findFirst({
            where: { email }
        })
        return emailAlreadyExist ? true : false
    }

    async usernameIsExist(username: string): Promise<Boolean> {
        const usernameAlreadyExist = await prismaClient.user.findFirst({
            where: { username }
        })
        return usernameAlreadyExist ? true : false
    }

    async create(data: CreateUserData): Promise<void> {
        await prismaClient.user.create({
            data
        })
    }
}

export {
    PrismaUserRepository
};

