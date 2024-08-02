import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  [key: string]: any; // Allow additional properties
}

test.describe('Put and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Put', async ({ request }) => {
      // put by id
      const responsePut = await request.put(`https://jsonplaceholder.typicode.com/posts/1`, {
        data: {
          id: 1,
          title: 'fuuu',
          body: 'bar',
          userId: 1
        }
      });
      
      // check response code
      expect(responsePut.ok()).toBeTruthy();
      
      // parse
      const responsePutJson: Post = await responsePut.json();

      // assert value
      expect(responsePutJson.id).toBe(1);
      expect(responsePutJson.title).toBe('fuuu');
      expect(responsePutJson.body).toBe('bar');
      expect(responsePutJson.userId).toBe(1);

      // check json schema
      const schema = require('./schema/get-by-id.schema.json');
      const valid = ajv.validate(schema, responsePutJson) as boolean;
      expect(valid).toBe(true);

  });  
});
