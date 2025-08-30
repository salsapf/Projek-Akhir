export class DashboardPage {
  // Selectors
  selectors = {
    dashboardTitle: ".oxd-topbar-header-breadcrumb h6",
    userDropdown: ".oxd-userdropdown-tab",
    logoutButton: '[href="/web/index.php/auth/logout"]',
    directoryMenu: '[href="/web/index.php/directory/viewDirectory"]',
    adminMenu: '[href="/web/index.php/admin/viewAdminModule"]',
    directoryMenu: '[href="/web/index.php/directory/viewDirectory"]',
    claimMenu: '.oxd-main-menu-item[href*="claim"]',
    sideMenu: "ul.oxd-main-menu",
    searchMenu: ".oxd-main-menu",
    dashboardCards: ".oxd-sheet",
    quickLaunch: ".oxd-grid-item",
  };

  // Click menu item by text
  clickMenu(menuText) {
    cy.contains(this.selectors.menuItems, menuText).click();
    return this;
  }

  // Click specific menus
  clickDirectoryMenu() {
    cy.get(this.selectors.directoryMenu).click();
    return this;
  }

  clickClaimMenu() {
    cy.get(this.selectors.claimMenu).click();
    return this;
  }

  // Verify dashboard loaded
  verifyDashboardLoaded() {
    cy.url().should("include", "dashboard");
    cy.get(this.selectors.dashboardTitle).should("contain.text", "Dashboard");
    cy.get(this.selectors.sideMenu).should("be.visible");
    return this;
  }

  // Verify menu items visible
  verifyMenuItems() {
    cy.get(this.selectors.menuItems).should("be.visible");
    cy.contains(this.selectors.menuItems, "Directory").should("be.visible");
    cy.contains(this.selectors.menuItems, "Claim").should("be.visible");
    return this;
  }

  // Logout
  logout() {
    cy.get(this.selectors.userDropdown).click();
    cy.get(this.selectors.logoutButton).click();
    return this;
  }
}
