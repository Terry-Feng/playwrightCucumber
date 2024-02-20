# cucumber-playwright

![Test](https://github.com/Tallyb/cucumber-playwright/workflows/Test/badge.svg)

This repo is for writing E2E tests based on Cucumber(7) with Playwright using Typescript.

## The Why

[Read](https://tally-b.medium.com/e2e-testing-with-cucumber-and-playwright-9584d3ef3360) or [watch](https://www.youtube.com/watch?v=PUVFmhYJNJA&list=PLwwCtx3xQxlVMZzS4oi2TafVRngQ1wF_0&index=2).

## Installation
- Install node.js. Version 20.11.1 is the recommended version now (https://nodejs.org/en) 
- Run `npm install` to install all dependencies.

## To run your tests

- `npm run e2e:tag @tag` to run the casual test with tag
- `npm run e2e:test:parallel` to run the parallel test to help you to prepare the test data
- `npm run e2e:test` to run all test

## Branch and environment selection

By default, test environment will be PREPROD and branch will be AU

Set environment variable to choose test ENV and branch

- Environment options: **LOCAL, QA, PREPROD, PROD**
- Country options: **AU, NZ**

On Linux and Mac you can write:

`environment=PREPROD npm run e2e:tag @tag` or `environment=PREPROD npx cucumber-js` runs all tests using Firefox

One Windows you need to write

```
set environment=PREPROD
npm run e2e:tag @tag
```

## Browser selection

By default, we will use chromium. You can define an envrionment variable called BROWSER and
set the name of the browser.

- Available options: **chromium, firefox, webkit**

On Linux and Mac you can write:

`BROWSER=firefox npm run e2e:tag @tag` or `BROWSER=firefox npx cucumber-js` runs all tests using Firefox

One Windows you need to write

```
set BROWSER=firefox
npm run e2e:tag @tag
```

## Debugging Features

Set environment PWDEBUG variable to open Playwirght debug console

`PWDEBUG=1` on Linux or `set PWDEBUG=1` on Windows

From VSCode

- Open the feature
- Select the debug options in the VSCode debugger
- Set breakpoints in the code

To stop the feature, you can add the `Then debug` step inside your feature. It will stop your debugger.

From Webstorm

- Add run/debug configuration
- Set breakpoint in the code
- Select the run/debug configuration just added and click debug

## Codegen feature

```
npx playwright codegen ${url}
```

## Adjust the code within the mock or 3rd party server

Currently, we provide the mock strategy as the backup solution for the 3rd party server.
We generally don't need to care about if the config switches to mock or actual server.
However, IDV (FrankieOne) and Bankstatement Check (Proviso) are a bit tricky due to the ui lib involving and uncontrollable callback.
Hence, we need to adjust the E2E script accordingly based on the config.

## To ignore a scenario

- tag the scenario with `@ignore`

## To run the repo via docker

**Please make sure you run the docker build/run in this folder path**

```
    docker build -t stallare-playwright .
    docker run -v :/app/ -e BROWSER=firefox -e headless=true playwright:latest npm run e2e:test
```

## Kudos

This repository is based on the [Cucumber-typescript-starter](https://github.com/hdorgeval/cucumber7-ts-starter/) repo.

## What's inside

- Typescript setup for writing steps with eslint/typescript and prettier
- Launching of Playwright browser before running all tests
- Launching new context and page for each scenario
- Running feature with video recording option
- Report generated with last good image attached
- Allure reports
- Utilies function to help you with writing steps
- VScode configuration to debug a single feature or an only scenario (run when located on the feature file)
