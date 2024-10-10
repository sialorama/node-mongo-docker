const request = require('supertest');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = require('./app');  // Assurez-vous que l'exportation du serveur fonctionne dans 'app.js'

jest.mock('mongodb', () => {
  const mMongoClient = {
    connect: jest.fn(),
    db: jest.fn(() => ({
      collection: jest.fn(() => ({
        find: jest.fn(() => ({
          toArray: jest.fn(() => [{ title: 'Test Book 1' }, { title: 'Test Book 2' }]),
        })),
        insertOne: jest.fn(() => ({ insertedId: 'mockedId' })),
        insertMany: jest.fn(() => ({ insertedIds: ['mockedId1', 'mockedId2'] })),
      })),
    })),
    close: jest.fn(),
  };
  return { MongoClient: jest.fn(() => mMongoClient) };
});

describe('Test routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /get-all-books should return all books', async () => {
    const res = await request(app).get('/get-all-books');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.books).toHaveLength(2);
    expect(res.body.data.books[0].title).toBe('Test Book 1');
  });

  it('POST /add-book should add a book', async () => {
    const newBook = { title: 'New Book', author: 'Author Name' };
    const res = await request(app)
      .post('/add-book')
      .send(newBook)
      .set('Accept', 'application/json');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.result.insertedId).toBe('mockedId');
  });

  it('POST /add-many-books should add multiple books', async () => {
    const newBooks = [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ];
    const res = await request(app)
      .post('/add-many-books')
      .send(newBooks)
      .set('Accept', 'application/json');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.result.insertedIds).toHaveLength(2);
    expect(res.body.data.result.insertedIds[0]).toBe('mockedId1');
  });
});
