import { LoginPage } from "../support/loginPage";

describe("OrangeHRM Login Tests", () => {
  let loginPage;
  // Visit the login page before each test.
  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
  });

  it("TC-001: Should load login page with all elements", () => {
    loginPage.verifyPageElements();
  });

  it("TC-002: Should login successfully with valid credentials", () => {
    loginPage.setupInterceptor("validLogin").login("Admin", "admin123");

    loginPage
      .verifyAPICall("validLogin", "Admin", "admin123")
      .verifyLoginSuccess();
  });

  it("TC-003: Should fail with invalid username", () => {
    loginPage.setupInterceptor("invalidUser").login("User", "admin123");

    loginPage
      .verifyAPICall("invalidUser", "User", "admin123")
      .verifyLoginFailed();
  });

  it("TC-004: Should fail with invalid password", () => {
    loginPage.setupInterceptor("invalidPass").login("Admin", "admin1234");

    loginPage
      .verifyAPICall("invalidPass", "Admin", "admin1234")
      .verifyLoginFailed();
  });

  it("TC-005: Should show error with empty username", () => {
    loginPage
      .setupInterceptor("emptyUsername")
      .enterPassword("admin123")
      .clickLogin();

    loginPage.verifyUsernameError().verifyNoAPICall("emptyUsername");
  });

  it("TC-006: Should show error with empty password", () => {
    loginPage
      .setupInterceptor("emptyPassword")
      .enterUsername("Admin")
      .clickLogin();

    loginPage.verifyPasswordError().verifyNoAPICall("emptyPassword");
  });

  it("TC-007: Should show errors with both fields empty", () => {
    loginPage.setupInterceptor("emptyBoth").clickLogin();

    loginPage.verifyBothErrors().verifyNoAPICall("emptyBoth");
  });

  it("TC-008: Should login with uppercase username", () => {
    loginPage.setupInterceptor("upperUsername").login("ADMIN", "admin123");

    loginPage
      .verifyAPICall("upperUsername", "ADMIN", "admin123")
      .verifyLoginSuccess();
  });

  it("TC-009: Should fail with uppercase password", () => {
    loginPage.setupInterceptor("upperPassword").login("Admin", "ADMIN123");

    loginPage
      .verifyAPICall("upperPassword", "Admin", "ADMIN123")
      .verifyLoginFailed();
  });

  it("TC-010: Should fail with both uppercase", () => {
    loginPage.setupInterceptor("upperBoth").login("ADMIN", "ADMIN123");

    loginPage
      .verifyAPICall("upperBoth", "ADMIN", "ADMIN123")
      .verifyLoginFailed();
  });

  it("TC-011: Should fail with space in username", () => {
    loginPage.setupInterceptor("spaceUsername").login(" Admin", "admin123");

    cy.wait("@spaceUsername").then((interception) => {
      expect(interception.request.body).to.include("username=+Admin");
    });
    loginPage.verifyLoginFailed();
  });

  it("TC-012: Should fail with space in password", () => {
    loginPage.setupInterceptor("spacePassword").login("Admin", " admin123");

    cy.wait("@spacePassword").then((interception) => {
      expect(interception.request.body).to.include("password=+admin123");
    });
    loginPage.verifyLoginFailed();
  });

  it("TC-013: Should fail with spaces in both fields", () => {
    loginPage.setupInterceptor("spaceBoth").login("Admin ", " admin123");

    cy.wait("@spaceBoth").then((interception) => {
      expect(interception.request.body).to.include("username=Admin+");
      expect(interception.request.body).to.include("password=+admin123");
    });
    loginPage.verifyLoginFailed();
  });

  it("TC-014: Should login using Enter key", () => {
    loginPage.setupInterceptor("enterKey").loginWithEnter("Admin", "admin123");

    loginPage
      .verifyAPICall("enterKey", "Admin", "admin123")
      .verifyLoginSuccess();
  });

  it("TC-015: Should navigate with Tab key", () => {
    loginPage.setupInterceptor("tabNav").tabNavigation();

    loginPage.verifyNoAPICall("tabNav");
  });

  afterEach(() => {
    loginPage.clearSession();
  });

  after(() => {
    cy.log("All tests completed successfully!");
  });
});
