import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test.describe('Put and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Put', async ({ request }) => {
      // get by id
      const responsePut = await request.put(`https://jsonplaceholder.typicode.com/posts/1`, {
        data: {
          id: 101,
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
      expect(responsePutJson.title).toBe('fuuu');

      //check json schema
      const valid = ajv.validate(require('./schema/get-by-id.schema.json'), responsePutJson);
      expect(valid).toBe(true);

  });  
});
