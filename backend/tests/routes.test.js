const request = require('supertest');
const app = require('../app');

describe('Index', () => {
    it('/', async () => {
        const res = await request(app).get('/');
        expect(res.status).toEqual(200);
    })
})

describe('Get Users', () => {
    it('/users', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toEqual(200);
    })
})

describe('Create User', () => {
    it('/users', async () => {
        const res = await request(app).post('/users').send({
            name: "user"
        });
        expect(res.status).toEqual(200);
        expect(res.body.id).toBeDefined();
    });
    
    // 
    it('/users', async () => {
        const res = await request(app).post('/users').send({
            name: ""
        });
        expect(res.status).toEqual(400);
    });
    
})