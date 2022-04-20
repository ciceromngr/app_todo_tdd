import { hash } from 'bcrypt'

interface IReqValue {
    value: string | Buffer,
    saltOrRounds: string | number
}

class Crypter {
    public valueHashed: string

    constructor() {
        this.valueHashed = ''
    }

    async hashed({ value, saltOrRounds }: IReqValue) {
        const valueHashed = await hash(value, saltOrRounds)
        this.valueHashed = valueHashed
        return valueHashed
    }
}

export {
    Crypter
}

