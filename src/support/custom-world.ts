import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Page, PlaywrightTestOptions } from '@playwright/test';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;

  testName?: string;
  startTime?: Date;
  provisoReference?: string;
  repaymentType?: string;
  server?: string;
  playwrightOptions?: PlaywrightTestOptions;
  variables?: Map<string, any>;
  jsonData?: any;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
  variables = new Map<string, any>();
}

setWorldConstructor(CustomWorld);
