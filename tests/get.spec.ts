import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test.describe('Get and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Get', async ({ request }) => {
      // get
      const responseGet = await request.get(`https://jsonplaceholder.typicode.com/posts`);
      
      // check response code
      expect(responseGet.ok()).toBeTruthy();

      //parse & check json schema
      const responseGetJson = JSON.parse(await responseGet.text());
      const valid = ajv.validate(require('./schema/get.schema.json'), responseGetJson);
      expect(valid).toBe(true);

  });  
});

