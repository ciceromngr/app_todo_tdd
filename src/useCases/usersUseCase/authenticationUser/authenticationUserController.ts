import { AuthenticationUserUseCase } from "./authenticationUserUseCase";
import { ILoginBodyRequest } from "./interfaces/ILoginBodyRequest";

export type HttpResponse = {
    body: string | Object | unknown
    statusCode: number
}

class AuthenticationUserController {

    constructor(
        private readonly authenticationUserUseCase: AuthenticationUserUseCase
    ) { }

    async handle(data: ILoginBodyRequest): Promise<HttpResponse> {
        try {
            const token = await this.authenticationUserUseCase.execute(data.body)
            return {
                body: token,
                statusCode: 200
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
    AuthenticationUserController
};

