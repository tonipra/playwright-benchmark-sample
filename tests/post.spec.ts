import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

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
      const responsePostJson = JSON.parse(await responsePost.text());

      // assert value
      expect(responsePostJson.title).toBe('foo');
      expect(responsePostJson.body).toBe('bar');
      expect(responsePostJson.userId).toBe(1);


      //check json schema
      const valid = ajv.validate(require('./schema/get-by-id.schema.json'), responsePostJson);
      expect(valid).toBe(true);

  });  
});

