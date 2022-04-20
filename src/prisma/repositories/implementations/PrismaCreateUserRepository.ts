import { prismaClient } from "../../prismaClient";
import { CreateUserData, CreateUserRepository } from "../CreateUserRepository";

class PrismaCreateUserRepository implements CreateUserRepository {

    async findByEmail(email: string): Promise<Boolean> {
        const emailAlreadyExist = await prismaClient.user.findFirst({
            where: { email }
        })
        return emailAlreadyExist ? true : false
    }

    async findByUsername(username: string): Promise<Boolean> {
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
    PrismaCreateUserRepository
};

