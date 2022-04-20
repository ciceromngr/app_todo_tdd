import { CreateUserUseCase } from "./createUserUseCase";
import { IUserBodyRequest } from "./interfaces/IUserBodyRequest";

export type HttpResponse = {
    body: string | Object | unknown
    statusCode: number
}

class CreateUserController {

    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) { }

    async handle(data: IUserBodyRequest): Promise<HttpResponse> {
        try {
            await this.createUserUseCase.create(data.body)
            return {
                body: 'Created!',
                statusCode: 201
            }
        } catch (error) {
            return {
                body: error,
                statusCode: 401
            }
        }
    }
}

export {
    CreateUserController
};

