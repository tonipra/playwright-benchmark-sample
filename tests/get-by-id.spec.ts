import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test.describe('Get by ID and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Get by ID', async ({ request }) => {
      // get by id
      const responseGet = await request.get(`https://jsonplaceholder.typicode.com/posts/1`);
      
      // check response code
      expect(responseGet.ok()).toBeTruthy();

      // parse
      const responseGetJson = JSON.parse(await responseGet.text());

      // assert value
      expect(responseGetJson.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');

      //check json schema
      const valid = ajv.validate(require('./schema/get-by-id.schema.json'), responseGetJson);
      expect(valid).toBe(true);

  });  
});

