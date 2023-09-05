import { Then } from "@badeball/cypress-cucumber-preprocessor";

const customerRowFor = function(customer: string) {
    const [firstName, lastName] = customer.split(' ');
    return cy.get('table').find(`tr:has(td:contains("${firstName}")):has(td:contains("${lastName}"))`)
};

Then('I should see the customer {string} with post code {string}', function(customer: string, postCode: string) {
    const [firstName, lastName] = customer.split(' ');

    customerRowFor(customer).as('customerRow');

    // Double check that first and last name are in the the proper columns
    cy.get('@customerRow').should('be.visible');
    cy.get('@customerRow').find('td').eq(0).should('contain', firstName);
    cy.get('@customerRow').find('td').eq(1).should('contain', lastName);
    cy.get('@customerRow').find('td').eq(2).should('contain', postCode);
    cy.get('@customerRow').find('td').eq(3).should('not.have.text');
    cy.get('@customerRow').find('td').eq(4).find('button').should('be.visible');
});

Then('I delete the customer {string}', function(customer: string) {
    // Double check that first and last name are in the the proper columns
    customerRowFor(customer).should('be.visible')
        .find('td').eq(4).find('button')
        .should('be.visible').and('be.enabled')
        .click();
});

Then('I should not see customer {string}', function(customer: string) {
    customerRowFor(customer).should('not.exist');
});