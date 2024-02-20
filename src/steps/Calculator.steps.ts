import { ICustomWorld } from '../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';
import { ConfigManager } from '../assets/settings';
import { expect } from '@playwright/test';
  
Given('the first number is {string}', async function (this: ICustomWorld, num: string) {
  const page = this.page!;
  console.log(`Running in ENV : ${ConfigManager.configs.env}`);
  await page.locator('#first-number').fill(num);
});

Given('the second number is {string}', async function (this: ICustomWorld, num: string) {
  const page = this.page!;
  await page.locator('#second-number').fill(num);
});

When('the two numbers are added', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('#add-button').click();
});

Then('the result should be {string}', async function (this: ICustomWorld, result: string) {
  const page = this.page!;

  const actualResult = page.locator('#result');
  await expect(actualResult).toHaveValue(result, {timeout: 5000});
});

