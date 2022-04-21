
import * as yup from 'yup';
import { ErrorCredentials } from "../../../middlewares/err/ErrorCredentials";
import { ErrorFormat } from '../../../middlewares/err/ErrorFormat';
import { ErrorUserAlreadyExist } from '../../../middlewares/err/ErrorUserAlreadyExist';
import { UserRepository } from "../../../prisma/repositories/UserRepository";
import { Crypter } from '../../../utils/helpers/Crypter';
import { EmailValidator } from '../../../utils/helpers/EmailValidator';
import { CreateUserResponse } from "./interfaces/createUserResponse";

export interface VerifyUsernameEmail {
    email: string
    username: string
}

export type ReceiveConstructorParams = {
    userRepository: UserRepository,
    crypter: Crypter,
    emailValidator: EmailValidator
}

class CreateUserUseCase {

    constructor(
        private readonly repository: ReceiveConstructorParams
    ) { }

    async create({ name, username, email, password }: CreateUserResponse): Promise<void> {
        const schema = yup.object().shape({
            name: yup.string().required(),
            username: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required()
        })

        if (!(await schema.isValid({ name, username, email, password }))) {
            throw new ErrorCredentials()
        }

        const isValid = this.repository.emailValidator.isValid(email)

        if (!isValid) {
            throw new ErrorFormat({ message: 'Check if the email is correct', statusCode: 401 })
        }

        await this.verifyUsernameEmailAlreadyExist({ username, email })

        const passwordHashed = await this.repository.crypter.hashed({ value: password, saltOrRounds: 10 })

        await this.repository.userRepository.create({ username, email, name, password: passwordHashed })
    }

    private async verifyUsernameEmailAlreadyExist({ email, username }: VerifyUsernameEmail): Promise<void> {
        const emailAlreadyExist = await this.repository.userRepository.findByEmail(email)
        const usernameAlreadyExist = await this.repository.userRepository.findByUsername(username)

        if (emailAlreadyExist) {
            throw new ErrorUserAlreadyExist({
                message: 'Email or Username Already Exist!',
                statusCode: 401
            })
        }

        if (usernameAlreadyExist) {
            throw new ErrorUserAlreadyExist({
                message: 'Email or Username Already Exist!',
                statusCode: 401
            })
        }
    }
}

export {
    CreateUserUseCase
};

