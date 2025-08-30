export class LoginPage {
  // Selectors
  selectors = {
    username: '[name="username"]',
    password: '[name="password"]',
    loginButton: 'button[type="submit"]',
    alert: ".oxd-alert",
    usernameError: ":nth-child(2) > .oxd-input-group > .oxd-text",
    passwordError: ":nth-child(3) > .oxd-input-group > .oxd-text",
    brandingImage: ".orangehrm-login-branding > img",
    loginLogo: ".orangehrm-login-logo > img",
    pageTitle: ".oxd-text--h5",
    forgotPassword: ".orangehrm-login-forgot > .oxd-text",
    usernameDemo: ".oxd-sheet > :nth-child(1)",
    passwordDemo: ".oxd-sheet > :nth-child(2)",
    logoUsername: ".oxd-icon.bi-person.oxd-input-group__label-icon",
    labelUsername:
      ":nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label",
    logoPassword: ".oxd-icon.bi-key.oxd-input-group__label-icon",
    labelPassword:
      ":nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label",
    copyrigth1: ".orangehrm-copyright-wrapper > :nth-child(1)",
    copyrigth2: ".orangehrm-copyright-wrapper > :nth-child(2)",
    footer: ".orangehrm-login-footer-sm",
  };

  // Navigate to login page
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    return this;
  }

  // Enter username
  enterUsername(username) {
    cy.get(this.selectors.username).clear().type(username);
    return this;
  }

  // Enter password
  enterPassword(password) {
    cy.get(this.selectors.password).clear().type(password);
    return this;
  }

  // Click login button
  clickLogin() {
    cy.get(this.selectors.loginButton).click();
    return this;
  }

  // CLick forgot password
  clickForgotPassword() {
    cy.get(this.selectors.forgotPassword).click();
    return this;
  }

  // Verify forgot password page
  verifyForgotPasswordPage() {
    cy.url().should("include", "requestPasswordResetCode");
    cy.get(".oxd-text--h6").should("contain.text", "Reset Password");
    return this;
  }

  // Login with credentials
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
    return this;
  }

  // Login using Enter key
  loginWithEnter(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    cy.get(this.selectors.password).type("{enter}");
    return this;
  }

  // Verify successful login
  verifyLoginSuccess() {
    cy.url().should("include", "dashboard");
    return this;
  }

  // Verify login failure
  verifyLoginFailed() {
    cy.get(this.selectors.alert).should("be.visible");
    return this;
  }

  // Verify username validation error
  verifyUsernameError() {
    cy.get(this.selectors.usernameError).should("be.visible");
    return this;
  }

  // Verify password validation error
  verifyPasswordError() {
    cy.get(this.selectors.passwordError).should("be.visible");
    return this;
  }

  // Verify both validation errors
  verifyBothErrors() {
    this.verifyUsernameError();
    this.verifyPasswordError();
    return this;
  }

  // Verify page elements are visible
  verifyPageElements() {
    cy.get(this.selectors.brandingImage).should("be.visible");
    cy.get(this.selectors.loginLogo).should("be.visible");
    cy.get(this.selectors.pageTitle).should("be.visible");
    cy.get(this.selectors.username).should("be.visible");
    cy.get(this.selectors.password).should("be.visible");
    cy.get(this.selectors.loginButton).should("be.visible").and("be.enabled");
    cy.get(this.selectors.usernameDemo).should("be.visible");
    cy.get(this.selectors.passwordDemo).should("be.visible");
    cy.get(this.selectors.logoUsername).should("be.visible");
    cy.get(this.selectors.logoPassword).should("be.visible");
    cy.get(this.selectors.labelUsername).should("be.visible");
    cy.get(this.selectors.labelPassword).should("be.visible");
    cy.get(this.selectors.forgotPassword).should("be.visible");
    cy.get(this.selectors.copyrigth1).should("be.visible");
    cy.get(this.selectors.copyrigth2).should("be.visible");
    cy.get(this.selectors.footer).should("be.visible");
    return this;
  }
  // Setup API interceptor
  setupInterceptor(alias = "loginAPI") {
    cy.intercept("POST", "**/auth/validate").as(alias);
    return this;
  }

  // Verify API call
  verifyAPICall(alias, username, password) {
    cy.wait(`@${alias}`).then((interception) => {
      expect(interception.request.body).to.include(`username=${username}`);
      expect(interception.request.body).to.include(`password=${password}`);
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });
    return this;
  }

  // Verify no API call made
  verifyNoAPICall(alias) {
    cy.get(`@${alias}.all`).should("have.length", 0);
    return this;
  }

  // Tab navigation
  tabNavigation() {
    cy.get(this.selectors.username).focus().should("have.focus");
    cy.get(this.selectors.username).tab();
    cy.get(this.selectors.password).should("have.focus");
    cy.get(this.selectors.password).tab();
    cy.get(this.selectors.loginButton).should("have.focus");
    return this;
  }

  // Clear session
  clearSession() {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => win.sessionStorage.clear());
    return this;
  }
}
