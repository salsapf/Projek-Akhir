import { LoginPage } from "../support/pageObjects/loginPage";
import { ForgotPasswordPage } from "../support/pageObjects/forgotPasswordPage";

describe("OrangeHRM Forgot Password Tests", () => {
  let loginPage, forgotPasswordPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    forgotPasswordPage = new ForgotPasswordPage();
    loginPage.visit();
  });

  it("TC-FP-001: Should navigate to forgot password from login", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage.verifyPageElements();
  });
  it("TC-FP-002: Should display all forgot password page element", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage.verifyPageElements();
  });

  it("TC-FP-003: Should request password reset with valid username", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage
      .setupResetInterceptor("validReset")
      .resetPassword("Admin");

    cy.wait("@validReset").then((interception) => {
      expect(interception.request.body).to.include("username=Admin");
    });
  });

  it("TC-FP-004: Should show error with empty username", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage.clickResetPassword();
    // Usually shows client-side validation
    cy.get('[name="username"]').should("have.class", "oxd-input--error");
  });

  it("TC-FP-005: Should cancel password reset and navigate back to login", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage.clickCancel().verifyRedirectToLogin();
  });
  it("TC-FP-006: Should clear and re-enter username", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage
      .enterUsername("Admin")
      .clearUsername()
      .enterUsername("TestUser");

    cy.get(forgotPasswordPage.selectors.usernameField).should(
      "have.value",
      "TestUser"
    );
  });

  it("TC-FP-007: Should handle username with spaces", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage
      .setupResetInterceptor("spacesInUsername")
      .resetPassword(" Admin ");

    cy.wait("@spacesInUsername").then((interception) => {
      // Verify spaces are handled properly in the request
      expect(interception.request.body).to.include("username=+Admin+");
    });
  });

  it("TC-FP-008: Should handle case sensitive username", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage
      .setupResetInterceptor("uppercaseUsername")
      .resetPassword("ADMIN");

    forgotPasswordPage.verifyAPICall("uppercaseUsername", "ADMIN");
  });

  it("TC-FP-009: Should submit form using Enter key", () => {
    loginPage.clickForgotPassword();
    forgotPasswordPage
      .setupResetInterceptor("enterKeySubmit")
      .enterUsername("Admin");

    cy.get(forgotPasswordPage.selectors.usernameField).type("{enter}");

    forgotPasswordPage.verifyAPICall("enterKeySubmit", "Admin");
  });
});
