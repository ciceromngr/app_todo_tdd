class ErrorCredentials {

    public readonly message: string
    public readonly statusCode: number

    constructor(message = 'Credentials invalid', statusCode = 401) {
        this.message = message
        this.statusCode = statusCode
    }
}

export {
    ErrorCredentials
}

