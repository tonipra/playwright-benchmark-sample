import { test, expect } from '@playwright/test';

test.describe('Delete and Check Response Schema', () => {

  test('Delete', async ({ request }) => {
      // get by id
      const responseDel = await request.delete(`https://jsonplaceholder.typicode.com/posts/1`);
      
      // check response code
      expect(responseDel.ok()).toBeTruthy();
  });  
});

