## Payconiq Automation Assignment

### What is Playwright?

Playwright is a Node.js library to automate Chromium, Firefox, and WebKit with a single API. Playwright is built to enable cross-browser web automation that is evergreen, capable, reliable, and fast.

### Scope

Following cases have been automated related to SauceDemo Tests:

1. The cart should be empty when a new user logins
2. The sorting should work (tesing sorting in descending order w.r.t. name)
3. A user should be able to add a product to cart and the same should be present in the cart
4. A user should be able to remove a product from the cart
5. A user should be able to complete the checkout process

_NOTE: The reason I chose the above test cases is that they test what we expect from a basic e-commernce website. Since there is common user, the cart should always be empty on a fresh login. Also, sorting should work as this is really helpful and then the user should be able to add or remove a product. Lastly the most critical functionality is the checkout.

## Tool/Framework Used

1. Playwright
2. Node
3. Typescript
4. Prettier

## Setup (On local)

1. Node should be installed on the system
2. Setup the following environment variables required for running the tests.
   1. export **USER_NAME**=<Username of the user>
   2. export **PASSWORD**=<User password>
3. Open a terminal and navigate to the downloaded test code directory. Install node packages
   > `npm install`

### Running tests

#### Running tests on all browsers

To run the tests, execute the following command which will run the tests on three browsers i.e. Chromium, Firefox and WebKit in the headless mode

```
npm run test
```

#### Running tests on a Specific Browser

To run the tests on a specific browser run the following command:

**For Chrome**:

```
npm run test:chrome
```

**For Firefox**:

```
npm run test:firefox
```

**For WebKit**:

```
npm run test:webkit
```

For running tests in a headed mode pass the flag as:

```
npm run test:chrome -- --headed
```

#### Viewing the reports

Playwright generates HTML report for each run which can we viewed by running a local server using the following command:

```
npm run show-report
```

### Playwright Trace Viewer

Playwright Trace Viewer is a GUI tool that helps exploring recorded Playwright traces after the script ran. In this project we have enabled trace collection for failed tests which can be used to debug failures.

To view the trace, run the following command:

```
npx playwright show-trace <path-to-the-trace-file-in-test-results-folder>
```

_NOTE: The trace is also available within the report for failed tests._
