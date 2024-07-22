process.env.NODE_ENV = 'test';

import request from 'supertest'
import { app, startServer, stopServer } from '../server.js'
import { jest } from '@jest/globals';


  // special function in Jest that means 'run this function before running any tests'
  beforeAll( async () => {
   await startServer()
  }, 30000)

  // special function in Jest that means 'run this function after running all tests'
  afterAll(async () => { 
    await stopServer()
  })

// group related tests
describe('API integration Tests', () => {

  // individual test for data
  it('responds with json containing a list of articles and their posted times', async () => {
    const response = await request(app)
    .get('/')
    .expect(200)

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0]).toHaveProperty('title')
    expect(response.body[0]).toHaveProperty('posted')
    expect(response.body[0]).toHaveProperty('link')
  }, 20000)

  // individual test for handling errors
  it('handles errors gracefully', async () => {


    // Look through all the pieces of our Express app. 
    // Find the one that's responsible for handling GET requests to the root path '/', and save it in the routeLayer variable
    // within the array we're looking for 
    // a layer that is a route handler, is on the root path, responds to a GET request
    const routeLayer = app._router.stack.find(layer => 
      layer.route && layer.route.path === '/' && layer.route.methods.get)

    // accessing the handler function on the correct route layer, storing it in the originalHandler variable
    const originalHandler = routeLayer.route.stack[0].handle

    let errorMock = jest.fn((req, res) => {
      res.status(500).json({ error: 'Failed to scrape data from HackerNews' });
    });

    // replace the original handler function with the mock functionality that simulates an error
    routeLayer.route.stack[0].handle = errorMock


    // perform the test
    const response = await request(app)
      .get('/')
      .expect(500);

    // what we expect test result to be
    expect(response.body).toHaveProperty('error', 'Failed to scrape data from HackerNews');

    // Restore the original route handler 
    routeLayer.route.stack[0].handle = originalHandler
  }, 20000);

    
})