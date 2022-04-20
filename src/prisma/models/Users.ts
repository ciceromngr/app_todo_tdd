import { randomUUID } from "crypto"

export class Users {
    public readonly id: string
    public name: string
    public username: string
    public email: string
    public password: string
    public created_at: Date
    public updated_at: Date

    constructor(props: Users) {
        this.id = randomUUID()
        this.name = props.name
        this.username = props.username
        this.email = props.email
        this.password = props.password
        this.created_at = props.created_at
        this.updated_at = props.updated_at
    }
}