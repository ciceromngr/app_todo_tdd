import { prismaClient } from "../../prismaClient";
import { CreateUserData, UserRepository } from "../UserRepository";

class PrismaUserRepository implements UserRepository {

    async emailIsExist(email: string): Promise<Boolean> {
        const emailAlreadyExist = await prismaClient.user.findFirst({
            where: { email }
        })
        return emailAlreadyExist ? true : false
    }

    async usernameIsExist(username: string): Promise<Boolean> {
        const emailAlreadyExist = await prismaClient.user.findFirst({
            where: { username }
        })
        return emailAlreadyExist ? true : false
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

