import request from 'supertest';
import { app } from '../../app';


describe('[E2E] Router User', () => {
    const dataRequest = {
        name: 'NameOfUser',
        email: 'email@email.com',
        password: 'password',
        username: 'surname'
    }

    it('should be possible to register a user ', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(dataRequest)
        expect(response.status).toBe(201)
        expect(response.body.error).toBeFalsy()
    })

    it('should NOT be possible to register a user with invalid params', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({
                ...dataRequest,
                username: ''
            })

        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'Credentials invalid', statusCode: 401 })
    })

    it('should NOT be possible to register a user with some email or username', async () => {
        const responseErrorEmailAlreadyExist = await request(app)
            .post('/user/register')
            .send(dataRequest)
        expect(responseErrorEmailAlreadyExist.status).toBe(401)
        expect(responseErrorEmailAlreadyExist.body).toEqual({
            message: 'Email or Username Already Exist!',
            statusCode: 401
        })

        const responseErrorUsernameAlreadyExist = await request(app)
            .post('/user/register')
            .send({
                ...dataRequest,
                email: 'other_email@email.com'
            })
        expect(responseErrorUsernameAlreadyExist.status).toBe(401)
        expect(responseErrorUsernameAlreadyExist.body).toEqual({
            message: 'Email or Username Already Exist!',
            statusCode: 401
        })
    })
})