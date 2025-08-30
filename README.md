# 🧪 OrangeHRM Cypress Automation Testing

Comprehensive automation testing for OrangeHRM using Cypress with Page Object Model (POM) and Intercept.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Test Execution](#test-execution)
- [Test Cases Coverage](#test-cases-coverage)
- [Configuration](#configuration)

## 🎯 Overview

This project provides automated testing for the OrangeHRM demo application, covering:

- **Login functionality** with comprehensive validation scenarios
- **Forgot Password** flow testing
- **Directory module** search and filter functionality

## ✨ Features

### 🔐 **Login Testing (15 Test Cases)**

- Valid/Invalid credentials testing
- Empty field validation
- Case sensitivity testing
- Special characters and spaces handling
- Keyboard navigation (Tab, Enter)
- API request/response validation

### 🔑 **Forgot Password Testing (9 Test Cases)**

- Navigation and form validation
- Valid/Invalid username handling
- Empty field validation
- Special characters support
- Keyboard navigation (Enter)
- API integration testing

### 📁 **Directory Testing (11 Test Cases)**

- Employee search by name, job title, location
- Form reset operations
- Search results validation
- Integration with other modules

## 📁 Project Structure

```
cypress/
├── downloads/
├── e2e/                                  # Test files
│   ├── directory.cy.js                   # Directory tests (11 cases)
│   ├── forgotPassword.cy.js              # Forgot password tests (9 cases)
│   ├── login.cy.js                       # Login tests (15 cases)
├── support/
│   ├── pageObjects
│   │   ├──DasboardPage.js                # Dashboard (POM)
│   │   ├── DirectoryPage.js              # Directory (POM)
│   │   ├── ForgotPasswordPage.js             # Forgot Password (POM)
│   │   ├── LoginPage.js                  # Login (POM)
│   ├── commands.js                       # Custom Cypress commands
│   └── e2e.js                            # Global configuration
└── fixtures/
    ├── testData.json                     # Basic test data

```

## 🔧 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Chrome/Chromium** browser
- Internet connection (for OrangeHRM demo site)

## 🚀 Installation

1. **Clone or download the project files**

2. **Install dependencies**

   ```bash
   npm install cypress --save-dev
   # or
   yarn add cypress --dev
   ```

3. **Initialize Cypress** (if needed)

   ```bash
   npx cypress open
   ```

4. **Copy test files** to your Cypress project structure

## ▶️ Test Execution

### **Run All Tests**

```bash
# Run all tests in headless mode
npx cypress run

# Run all tests with browser UI
npx cypress open
```

### **Run Specific Test Suites**

```bash
# Login tests only
npx cypress run --spec "cypress/e2e/login.cy.js"

# Forgot password tests
npx cypress run --spec "cypress/e2e/forgotPassword.cy.js"

# Directory tests (error-resistant version)
npx cypress run --spec "cypress/e2e/directory.cy.js"
```

### **Run Tests with Specific Browser**

```bash
# Chrome
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge
```

## 📊 Test Cases Coverage

### **Summary Statistics**

- **Total Test Cases:** 35
- **Login Module:** 15 test cases
- **Forgot Password:** 9 test cases
- **Directory Module:** 11 test cases

### **Detailed Test Coverage**

#### **Login Tests (TC-LG-001 to TC-LG-015)**

- ✅ Page elements validation
- ✅ Valid/Invalid credentials
- ✅ Empty field validation
- ✅ Case sensitivity testing
- ✅ Special characters handling
- ✅ Keyboard navigation
- ✅ API request validation

#### **Forgot Password Tests (TC-FP-001 to TC-FP-009)**

- ✅ Navigation testing
- ✅ Form validation
- ✅ Username scenarios (valid, invalid, empty)
- ✅ Special characters support
- ✅ API integration

#### **Directory Tests (TC-DIR-001 to TC-DIR-011)**

- ✅ Page elements validation
- ✅ Search functionality (name, job title, location)
- ✅ Form reset operations
- ✅ Results validation

## ⚙️ Configuration

### **Cypress Configuration**

```javascript
// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 30000,
    baseUrl: "https://opensource-demo.orangehrmlive.com",
  },
});
```

### **Test File Structure**

```javascript
describe("Feature Name - Test Category", () => {
  beforeEach(() => {
    // Setup and error handling
  });

  it("TC-XXX-001: Should test specific functionality", () => {
    // Test implementation
  });

  afterEach(() => {
    // Cleanup
  });
});
```

_Last updated: August 2025_
