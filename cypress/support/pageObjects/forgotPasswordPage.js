export class ForgotPasswordPage {
  // Selectors
  selectors = {
    pageTitle: "h6",
    pageSubtitle: ".oxd-text--p",
    usernameField: '[name="username"]',
    resetButton: 'button[type="submit"]',
    cancelButton: ".oxd-button--ghost",
    backToLogin: ".orangehrm-forgot-password-link",
    successMessage: ".oxd-text--toast-message",
    errorMessage: ".oxd-input-field-error-message",
    usernameLabel: ".oxd-label",
    usernameError: ".oxd-input-group > .oxd-text",
    formContainer: ".orangehrm-forgot-password-container",
  };

  // Navigate to forgot password page
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    return this;
  }

  // Enter username for password reset
  enterUsername(username) {
    cy.get(this.selectors.usernameField).clear().type(username);
    return this;
  }

  // Clear username field
  clearUsername() {
    cy.get(this.selectors.usernameField).clear();
    return this;
  }

  // Click reset password button
  clickResetPassword() {
    cy.get(this.selectors.resetButton).click();
    return this;
  }

  // Click cancel button
  clickCancel() {
    cy.get(this.selectors.cancelButton).click();
    return this;
  }

  // Click back to login link
  clickBackToLogin() {
    cy.get(this.selectors.backToLogin).click();
    return this;
  }

  // Setup interceptor for password reset
  setupResetInterceptor(alias = "resetPassword") {
    cy.intercept("POST", "**/auth/requestResetPassword").as(alias);
    return this;
  }

  // Verify forgot password page loaded
  verifyPageLoaded() {
    cy.url().should("include", "requestPasswordResetCode");
    cy.get(this.selectors.pageTitle).should("contain.text", "Reset Password");
    cy.get(this.selectors.pageSubtitle).should(
      "contain.text",
      "Please enter your username to identify your account to reset your password"
    );
    cy.get(this.selectors.usernameField).should("be.visible");
    cy.get(this.selectors.resetButton)
      .should("be.visible")
      .and("contain.text", "Reset Password");
    cy.get(this.selectors.cancelButton)
      .should("be.visible")
      .and("contain.text", "Cancel");
    cy.get(this.selectors.usernameLabel).should("contain.text", "Username");
    return this;
  }

  // Verify page elements
  verifyPageElements() {
    cy.get(this.selectors.pageTitle)
      .should("be.visible")
      .and("contain.text", "Reset Password");
    cy.get(this.selectors.formContainer).should("be.visible");
    cy.get(this.selectors.usernameLabel)
      .should("be.visible")
      .and("contain.text", "Username");
    cy.get(this.selectors.usernameField)
      .should("be.visible")
      .and("have.attr", "placeholder");
    cy.get(this.selectors.resetButton)
      .should("be.visible")
      .and("be.enabled")
      .and("contain.text", "Reset Password");
    cy.get(this.selectors.cancelButton)
      .should("be.visible")
      .and("contain.text", "Cancel");
    return this;
  }

  // Verify success message
  verifySuccessMessage() {
    cy.get(this.selectors.successMessage, { timeout: 10000 }).should(
      "be.visible"
    );
    return this;
  }

  // Verify username validation error
  verifyUsernameError() {
    cy.get(this.selectors.usernameError)
      .should("be.visible")
      .and("contain.text", "Required");
    return this;
  }

  // Verify error message
  verifyErrorMessage() {
    cy.get(this.selectors.errorMessage).should("be.visible");
    return this;
  }

  // Verify redirect to login page
  verifyRedirectToLogin() {
    cy.url().should("include", "auth/login");
    return this;
  }

  // Complete password reset process
  resetPassword(username) {
    this.enterUsername(username);
    this.clickResetPassword();
    return this;
  }

  // Verify API call
  verifyAPICall(alias, expectedUsername) {
    cy.wait(`@${alias}`).then((interception) => {
      expect(interception.request.body).to.include(
        `username=${expectedUsername}`
      );
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });
    return this;
  }
}
