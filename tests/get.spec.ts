import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  [key: string]: any; // Allow additional properties
}

test.describe('Get and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Get', async ({ request }) => {
      // get
      const responseGet = await request.get(`https://jsonplaceholder.typicode.com/posts`);
      
      // check response code
      expect(responseGet.ok()).toBeTruthy();

      // parse & check json schema
      const responseGetJson: Post[] = await responseGet.json();
      const schema = require('./schema/get.schema.json');
      const valid = ajv.validate(schema, responseGetJson) as boolean;
      expect(valid).toBe(true);
  });  
});
