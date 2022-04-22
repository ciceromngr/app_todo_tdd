import request from 'supertest';
import { app } from '../../app';

describe('[E2E] Router Authentication User', () => {
    beforeAll(async () => {
        const dataRequestCreation = {
            name: 'user_name',
            email: 'user_email@email.com',
            password: 'user_password',
            username: 'user_surname'
        }
        await request(app)
            .post('/user/register')
            .send(dataRequestCreation)
    })

    const dataRequest = {
        password: 'user_password',
        username: 'user_surname'
    }

    it('should be possible effect login with correct username and password ', async () => {
        const response = await request(app)
            .post('/user/auth')
            .send(dataRequest)
        expect(response.status).toBe(200)
        expect(response.body.error).toBeFalsy()
    })

    it('should NOT be possible effect login with incorrect username and password ', async () => {
        const responseUserIncorrect = await request(app)
            .post('/user/auth')
            .send({
                ...dataRequest,
                username: 'user_incorrect'
            })
        expect(responseUserIncorrect.status).toBe(401)
        expect(responseUserIncorrect.body).toEqual({ message: 'Username or password invalids', statusCode: 401 })
        
        const responsePasswordIncorrect = await request(app)
            .post('/user/auth')
            .send({
                ...dataRequest,
                password: 'password_incorrect'
            })
        expect(responsePasswordIncorrect.status).toBe(401)
        expect(responsePasswordIncorrect.body).toEqual({ message: 'Username or password invalids', statusCode: 401 })
    })

    it('should NOT be possible effect login with invalid params', async () => {
        const response = await request(app)
            .post('/user/auth')
            .send()
        expect(response.status).toBe(401)
        expect(response.body).toEqual({ message: 'Credentials invalid', statusCode: 401 })
    })

})