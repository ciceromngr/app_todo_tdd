import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as yup from 'yup';
import { ErrorCredentials } from "../../../middlewares/err/ErrorCredentials";
import { UserRepository } from '../../../prisma/repositories/UserRepository';
import { ILoginUser } from "./interfaces/ILoginUser";

class AuthenticationUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute({ username, password }: ILoginUser): Promise<string> {
        const schema = yup.object().shape({
            username: yup.string().required(),
            password: yup.string().required()
        })

        if (!(await schema.isValid({ username, password }))) {
            throw new ErrorCredentials({
                message: 'Credentials invalid',
                statusCode: 401
            })
        }

        //verificar se o username existe no banco
        const userExist = await this.userRepository.findUserByUsername(username)

        if (!userExist) {
            throw new ErrorCredentials({
                message: 'Username or password invalids',
                statusCode: 401
            })
        }

        //verificar se o password é o mesmo do banco
        const comparePassHash = await compare(password, userExist.password)

        if(!comparePassHash) {
            throw new ErrorCredentials({
                message: 'Username or password invalids',
                statusCode: 401
            })
        }

        //criar o token e retorna
        const secret = process.env.JWT_SECRET || ''
        const token = sign(
            {
                user: {
                    name: userExist.name,
                    username: userExist.username,
                    email: userExist.email
                }
            }, 
            secret,
            {
                expiresIn: '1d',
                subject: userExist.id
            }
        )

        return token
    }

}

export {
    AuthenticationUserUseCase
};

