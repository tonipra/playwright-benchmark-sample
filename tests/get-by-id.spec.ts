import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  [key: string]: any; // Allow additional properties
}

test.describe('Get by ID and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Get by ID', async ({ request }) => {
      // get by id
      const responseGet = await request.get(`https://jsonplaceholder.typicode.com/posts/1`);
      
      // check response code
      expect(responseGet.ok()).toBeTruthy();

      // parse
      const responseGetJson: Post = await responseGet.json();

      // assert value
      expect(responseGetJson.userId).toBe(1);
      expect(responseGetJson.id).toBe(1);
      expect(responseGetJson.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
      expect(responseGetJson.body).toBe('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');

      // check json schema
      const schema = require('./schema/get-by-id.schema.json');
      const valid = ajv.validate(schema, responseGetJson) as boolean;
      expect(valid).toBe(true);
  });  
});
