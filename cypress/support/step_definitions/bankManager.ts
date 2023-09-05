import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given('I open the {string} page', function(page: string) {
    cy.contains(page).should('be.visible').click();
    cy.contains(page).should('have.class', 'btn-primary');
    // We may add URL check here as well, but it does not always work for SPA
});

