export class DirectoryPage {
  // Selectors
  selectors = {
    directoryMenu: 'a[href="/web/index.php/directory/viewDirectory"]',
    sidebarToggle: ".oxd-icon-button.oxd-main-menu-button",
    pageTitle: ".oxd-text--h6:first",
    employeeNameInput: ".oxd-autocomplete-text-input input",
    jobTitleDropdown: ".oxd-select-text-input:first",
    locationDropdown: ".oxd-select-text-input:eq(1)",
    nameLabel:
      ":nth-child(1) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label",
    jobTitleLabel:
      ":nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label",
    locationLabel:
      ":nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label",
    searchButton: '[type="submit"]',
    searchForm: ".oxd-form",
    resetButton: ".oxd-button--ghost",
    employeeCards: ".oxd-sheet",
    employeeName: ".orangehrm-directory-card-header",
    employeeTitle: ".orangehrm-container",
    employeeLocation: ".orangehrm-directory-card-body",
    dropdownOptions: ".oxd-select-option",
    noRecordsMessage: ".orangehrm-horizontal-padding span",
  };

  // Click directory menu from sidebar
  clickDirectoryMenu() {
    cy.get(this.selectors.directoryMenu).click();
    return this;
  }

  searchByEmployeeName(name) {
    cy.get(this.selectors.employeeNameInput).type(name);
    return this;
  }

  selectJobTitle(jobTitle) {
    cy.get(this.selectors.jobTitleDropdown).click();
    cy.get(this.selectors.dropdownOptions).contains(jobTitle).click();
    return this;
  }

  selectLocation(location) {
    cy.get(this.selectors.locationDropdown).click();
    cy.get(this.selectors.dropdownOptions).contains(location).click();
    return this;
  }

  clickSearch() {
    cy.get(this.selectors.searchButton).click();
    cy.wait(2000);
    return this;
  }

  clickReset() {
    cy.get(this.selectors.resetButton).click();
    return this;
  }

  // Verify directory page loaded
  verifyPageLoaded() {
    cy.url().should("include", "directory");
    cy.get(this.selectors.pageTitle).should("contain.text", "Directory");
    cy.get(this.selectors.searchButton).should("be.visible");
    cy.get(this.selectors.resetButton).should("be.visible");
    return this;
  }

  // Setup search interceptor
  setupSearchInterceptor(alias = "directorySearch") {
    cy.intercept("GET", "**/directory/employees**").as(alias);
    return this;
  }
  // Verify page elements
  verifyPageElements() {
    cy.get(this.selectors.pageTitle)
      .should("be.visible")
      .and("contain.text", "Directory");
    cy.get(this.selectors.searchForm).should("be.visible");
    cy.get(this.selectors.employeeNameInput).should("be.visible");
    cy.get(this.selectors.jobTitleDropdown).should("be.visible");
    cy.get(this.selectors.locationDropdown).should("be.visible");
    cy.get(this.selectors.searchButton).should("be.visible").and("be.enabled");
    cy.get(this.selectors.resetButton).should("be.visible").and("be.enabled");
    return this;
  }

  verifyFormLabel() {
    cy.get(this.selectors.nameLabel).should("be.visible");
    cy.get(this.selectors.jobTitleLabel).should("be.visible");
    cy.get(this.selectors.locationLabel).should("be.visible");
    return this;
  }

  // Verify search results
  verifySearchResults() {
    cy.get(this.selectors.employeeCards).should("be.visible");
    cy.get(this.selectors.employeeCards).should("have.length.greaterThan", 0);
    return this;
  }

  // Verify no results message
  verifyNoResults() {
    cy.get(this.selectors.noRecordsMessage)
      .should("be.visible")
      .and("contain.text", "No Records Found");
    return this;
  }

  // Verify specific employee in results
  verifyEmployeeInResults(employeeName) {
    cy.get(this.selectors.employeeName).should("contain.text", employeeName);
    return this;
  }

  // Get employee cards count
  getEmployeeCardsCount() {
    return cy.get(this.selectors.employeeCards).its("length");
  }

  // Complete search process
  searchEmployee(employeeName, jobTitle = null, location = null) {
    if (employeeName) this.searchByEmployeeName(employeeName);
    if (jobTitle) this.selectJobTitle(jobTitle);
    if (location) this.selectLocation(location);
    this.clickSearch();
    return this;
  }

  // Search with name only (simple search)
  searchByName(name) {
    this.enterEmployeeName(name);
    this.clickSearch();
    return this;
  }

  // Reset search form
  resetSearch() {
    this.clickReset();
    return this;
  }
  // Verify job title dropdown options
  verifyJobTitleOptions() {
    cy.get(this.selectors.jobTitleDropdown).click();
    cy.get(this.selectors.dropdownOptions).should("have.length.greaterThan", 1);
    cy.get(this.selectors.dropdownOptions).first().should("be.visible");
    // Click outside to close dropdown
    cy.get(this.selectors.pageTitle).click();
    return this;
  }

  // Verify location dropdown options
  verifyLocationOptions() {
    cy.get(this.selectors.locationDropdown).click();
    cy.get(this.selectors.dropdownOptions).should("have.length.greaterThan", 1);
    cy.get(this.selectors.dropdownOptions).first().should("be.visible");
    // Click outside to close dropdown
    cy.get(this.selectors.pageTitle).click();
    return this;
  }

  // Verify API call
  verifySearchAPI(alias) {
    cy.wait(`@${alias}`).then((interception) => {
      expect(interception.response.statusCode).to.equal(200, 304);
    });
    return this;
  }
}
