import { IErrorsData } from "../interface/IErrorsData"

class ErrorFormat {

    public readonly message: string
    public readonly statusCode: number

    constructor({ message, statusCode}: IErrorsData) {
        this.message = message
        this.statusCode = statusCode
    }
}

export {
    ErrorFormat
}

