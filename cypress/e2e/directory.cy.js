import { LoginPage } from "../support/pageObjects/loginPage";
import { DashboardPage } from "../support/pageObjects/dashboardPage";
import { DirectoryPage } from "../support/pageObjects/directoryPage";

describe("OrangeHRM Directory Tests", () => {
  let loginPage, directoryPage, dashboardPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
    directoryPage = new DirectoryPage();
    // Login and navigate to directory
    loginPage.visit().login("Admin", "admin123").verifyLoginSuccess();
    dashboardPage.clickDirectoryMenu();
    directoryPage.verifyPageLoaded();
  });

  it("TC-DIR-001: Should display All directory page elements", () => {
    directoryPage.verifyPageElements();
  });
  it("TC-DIR-002: Should show job title dropdown options", () => {
    directoryPage.verifyJobTitleOptions();
  });
  it("TC-DIR-003: Should show location dropdown options", () => {
    directoryPage.verifyLocationOptions();
  });
  it("TC-DIR-004: Should verify form labels and placeholders", () => {
    directoryPage.verifyFormLabel();
  });
  it("TC-DIR-005: Should search all employees (empty search)", () => {
    directoryPage.setupSearchInterceptor("allEmployees").clickSearch();

    directoryPage.verifySearchAPI("allEmployees").verifySearchResults(true);
  });

  it("TC-DIR-006: Should display employee directory by default", () => {
    directoryPage.verifySearchResults();
  });

  it("TC-DIR-007: Should search employee by name", () => {
    dashboardPage.clickDirectoryMenu();
    directoryPage
      .setupSearchInterceptor("nameSearch")
      .searchByEmployeeName("Peter Mac Anderson")
      .clickSearch();

    directoryPage.verifySearchAPI("nameSearch");
    // Verify results or no results message appears
    cy.get("body").then(($body) => {
      if ($body.find(".orangehrm-directory-card").length > 0) {
        directoryPage.verifySearchResults();
      } else {
        directoryPage.verifyNoResults();
      }
    });
  });
  it("TC-DIR-008: Should filter by job title", () => {
    dashboardPage.clickDirectoryMenu();
    directoryPage
      .setupSearchInterceptor("titleSearch")
      .selectJobTitle("Chief Financial Officer")
      .clickSearch();

    directoryPage.verifySearchAPI("titleSearch");
  });

  it("TC-DIR-009: Should filter by location", () => {
    dashboardPage.clickDirectoryMenu();
    directoryPage
      .setupSearchInterceptor("locationSearch")
      .selectLocation("New York Sales Office")
      .clickSearch();

    directoryPage.verifySearchAPI("locationSearch");
  });

  it("TC-DIR-010: Should reset search filters", () => {
    // First apply some filters
    directoryPage
      .searchByEmployeeName("Peter Mac Anderson")
      .selectJobTitle("Chief Financial Officer")
      .clickReset();

    // Verify fields are cleared
    cy.get(directoryPage.selectors.employeeNameInput).should("have.value", "");
  });

  it("TC-DIR-011: Should handle combined search criteria", () => {
    directoryPage
      .setupSearchInterceptor("combinedSearch")
      .searchEmployee(
        "Peter Mac Anderson",
        "Chief Executive Officer",
        "New York Sales Office"
      )
      .verifySearchAPI("combinedSearch");
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
