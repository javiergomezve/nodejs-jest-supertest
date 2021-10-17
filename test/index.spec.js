import request from 'supertest';
import app from '../src/app.js';

describe('GET /tasks', () => {
    test('should respond with 200 status code', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.statusCode).toBe(200);
    });

    test('should respond with an array', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('POST /tasks', () => {
    describe('given a title and a description', () => {
        const newTask = {
            title: 'lorem ipsum',
            description: 'dollar asitmen',
        };

        test('should respond with a 200 status code', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.statusCode).toBe(200);
        });

        test('should respond have a content-type of application/json', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        test('should respond with an task id', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        });
    });

    describe('when title and description are missing ', () => {
        test('should respond with 400 status code', async () => {
            const fields = [{}, { title: 'lorem' }, { description: 'ipsum' }];

            for (const body of fields) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        });
    });
});
