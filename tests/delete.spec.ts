import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test.describe('Delete and Check Response Schema', () => {

  const ajv = new Ajv();

  test('Delete', async ({ request }) => {
      // get by id
      const responseDel = await request.delete(`https://jsonplaceholder.typicode.com/posts/1`);
      
      // check response code
      expect(responseDel.ok()).toBeTruthy();
      
      // parse
      // const responseDelJson = JSON.parse(await responseDel.text());

      // // assert value
      // expect(responseDelJson.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');

      // //check json schema
      // const valid = ajv.validate(require('./schema/get-by-id.schema.json'), responseDelJson);
      // expect(valid).toBe(true);

  });  
});

