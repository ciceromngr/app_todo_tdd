import { IErrorsData } from "../interface/IErrorsData"

class ErrorCredentials {

    public readonly message: string
    public readonly statusCode: number

    constructor({ message = 'Credentials invalid', statusCode = 401 }: IErrorsData) {
        this.message = message
        this.statusCode = statusCode
    }
}

export {
    ErrorCredentials
}

