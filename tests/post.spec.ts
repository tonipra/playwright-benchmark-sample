import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

interface PostResponse {
  title: string;
  body: string;
  userId: number;
  [key: string]: any; // Allow additional properties
}

test.describe('Post and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Post', async ({ request }) => {
      // get by id
      const responsePost = await request.post(`https://jsonplaceholder.typicode.com/posts`, {
        data: {
          title: 'foo',
          body: 'bar',
          userId: 1
        }
      });
      
      // check response code
      expect(responsePost.ok()).toBeTruthy();
      
      // parse
      const responsePostJson: PostResponse = JSON.parse(await responsePost.text());

      // assert value
      expect(responsePostJson.title).toBe('foo');
      expect(responsePostJson.body).toBe('bar');
      expect(responsePostJson.userId).toBe(1);

      //check json schema
      const schema = require('./schema/get-by-id.schema.json');
      const valid = ajv.validate(schema, responsePostJson) as boolean;
      expect(valid).toBe(true);
  });  
});
