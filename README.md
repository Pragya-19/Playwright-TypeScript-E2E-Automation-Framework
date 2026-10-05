# Playwright TypeScript E2E Automation Framework

[![Playwright Tests](https://github.com/Pragya-19/Playwright-TypeScript-E2E-Automation-Framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Pragya-19/Playwright-TypeScript-E2E-Automation-Framework/actions/workflows/playwright.yml)

End-to-end UI automation framework built using **Playwright and TypeScript** with **Page Object Model, reusable page classes, external JSON test data, Playwright assertions, HTML reporting, and GitHub Actions CI/CD**.

The application under test is **SauceDemo / Swag Labs**.

---

## Project Objective

This project demonstrates a structured and maintainable end-to-end UI automation framework for validating critical e-commerce workflows.

The framework focuses on:

- separation of test logic and page interactions
- reusable Page Object classes
- external test-data management
- positive and negative test coverage
- Playwright web-first assertions
- stable Chromium execution
- automated CI execution
- HTML test reporting

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model
- JSON Test Data
- Git
- GitHub
- GitHub Actions
- Playwright HTML Reporter

---

## Framework Architecture

```text
External Test Data
        ↓
Playwright Test Cases
        ↓
Page Object Model
        ↓
Reusable Page Methods & Locators
        ↓
Browser Automation
        ↓
Playwright Assertions
        ↓
HTML Test Report
        ↓
GitHub Actions CI
```

---

## Project Structure

```text
Playwright-TypeScript-E2E-Automation-Framework
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── data/
│   └── testData.json
│
├── docs/
│   └── screenshots/
│       ├── playwright-report-20-passed.png
│       └── github-actions-ci-passed.png
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   └── ecommerceE2E.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

---

## Test Coverage

The current suite contains **20 automated Playwright test cases** covering the major SauceDemo user journeys.

### Login

- successful login with valid credentials
- invalid credential validation
- locked-out user validation
- empty-field validation
- login page validation

### Inventory

- inventory page verification
- product listing validation
- adding products to cart
- removing products
- shopping cart badge validation

### Shopping Cart

- cart navigation
- selected-product validation
- removing products from cart
- continuing shopping
- cart-state validation

### Checkout

- checkout navigation
- customer information entry
- checkout overview validation
- price and order-summary validation
- successful order completion
- confirmation validation

---

## Page Object Model

The framework uses the **Page Object Model (POM)** to separate page-specific locators and actions from test scenarios.

```text
Test
 ↓
Page Object
 ↓
Locator / Action
 ↓
Application
```

Page classes include:

```text
LoginPage
InventoryPage
CartPage
CheckoutPage
```

This improves:

- maintainability
- code reuse
- readability
- locator management
- test scalability

---

## External Test Data

Test data is maintained separately from the automation logic using:

```text
data/testData.json
```

This keeps test inputs separate from test implementation and makes data maintenance easier.

---

## Running the Project

### Install dependencies

```bash
npm install
```

### Install Chromium

```bash
npx playwright install chromium
```

### Run the stable Chromium suite

```bash
npm test
```

### Run all configured browser projects

```bash
npm run test:all
```

### Run Chromium in headed mode

```bash
npm run test:headed
```

### Open Playwright UI mode

```bash
npm run test:ui
```

### Open the HTML report

```bash
npm run report
```

---

## NPM Scripts

The project provides reusable commands for common test-execution workflows:

```text
npm test
        → Chromium automation suite

npm run test:all
        → All configured Playwright browser projects

npm run test:headed
        → Chromium execution with visible browser

npm run test:ui
        → Playwright interactive UI mode

npm run report
        → Open latest Playwright HTML report
```

---

## Current Execution Status

- **20 automated Playwright tests**
- **20/20 passing locally on Chromium**
- **0 failed**
- GitHub Actions CI passing
- Ubuntu CI execution validated
- Playwright HTML reporting enabled
- HTML report uploaded as a CI artifact

---

## Execution Evidence

### Local Playwright Execution

The current stable Chromium suite executes all **20 automated tests successfully**.

![Playwright HTML Report](docs/screenshots/playwright-report-20-passed.png)

---

### GitHub Actions CI

The same stable automation suite executes successfully in a clean **Ubuntu GitHub Actions environment**.

![GitHub Actions CI](docs/screenshots/github-actions-ci-passed.png)

The CI pipeline:

1. checks out the repository
2. sets up Node.js
3. installs project dependencies
4. installs Chromium
5. executes the Playwright suite
6. uploads the Playwright HTML report as a workflow artifact

---

## CI/CD Architecture

```text
Code Push / Pull Request
          ↓
GitHub Actions Trigger
          ↓
Ubuntu Runner
          ↓
Node.js Setup
          ↓
npm ci
          ↓
Install Chromium
          ↓
npm test
          ↓
Playwright Assertions
          ↓
HTML Report
          ↓
Workflow Artifact
```

---

## CI Debugging Example

During CI integration, the test suite passed locally on Windows but initially failed on the Linux GitHub Actions runner because of a **filename casing mismatch**.

The test referenced:

```text
testData.json
```

while the repository contained:

```text
testData.JSON
```

Windows handled the casing difference, while Linux treated the filenames as different.

The issue was resolved by standardizing the filename and import casing.

This highlights an important CI principle:

> A test framework should be validated in a clean environment, not only on the developer's local machine.

---

## Browser Strategy

The Playwright configuration supports multiple browser projects.

For the current portfolio baseline:

```text
Default local execution → Chromium
Default CI execution    → Chromium
```

Chromium is used as the stable automated quality gate.

Additional configured browser projects can be executed using:

```bash
npm run test:all
```

Cross-browser stability can be expanded independently without affecting the default CI baseline.

---

## Key Concepts Demonstrated

- Playwright browser automation
- TypeScript
- End-to-end UI testing
- Page Object Model
- Reusable page methods
- Locator management
- External JSON test data
- Positive testing
- Negative testing
- Playwright web-first assertions
- Test reporting
- Git version control
- GitHub Actions CI/CD
- Linux CI execution
- CI debugging
- Test artifact generation

---

## Key Learning

This project demonstrates that building a reliable automation framework requires more than writing test scripts.

The framework combines:

```text
Test Design
   +
Reusable Automation
   +
Stable Assertions
   +
Test Data Management
   +
CI Execution
   +
Reporting
```

to create a repeatable end-to-end quality-engineering workflow.
