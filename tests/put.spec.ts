import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test.describe('Put and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Put', async ({ request }) => {
      // get by id
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
      const responsePutJson = JSON.parse(await responsePut.text());

      // assert value
      expect(responsePutJson.id).toBe(1);
      expect(responsePutJson.title).toBe('fuuu');
      expect(responsePutJson.body).toBe('bar');
      expect(responsePutJson.userId).toBe(1);

      //check json schema
      const valid = ajv.validate(require('./schema/get-by-id.schema.json'), responsePutJson);
      expect(valid).toBe(true);

  });  
});

