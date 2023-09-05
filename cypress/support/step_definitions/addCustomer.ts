import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

When('I add customer {string} with post code {string}', function(customer: string, postCode: string) {
    /**
     * Adding the customer with specified name and postcode.
     * As far as customers are stored in local storage we don't worry about the random names for them.
     */

    const [firstName, lastName] = customer.split(' ');

    // We may search for elements by label element, placeholder and the ng-model attribute
    // All the options are not OK, because label and placeholder may be changed in different languages
    // And ng-model might be changed in the future.
    // I'm using ng-model here, but data-at attributes should be added to the elements for better test stability.

    cy.get('input[placeholder="First Name"]').type(firstName);
    cy.get('input[placeholder="Last Name"]').type(lastName);
    cy.get('input[placeholder="Post Code"]').type(postCode);
    cy.get('button[type="submit"]').click();
});

Then('I should see the customer added alert', function() {
    cy.on('window:alert', text => {
        expect(text).to.contains('Customer added successfully');
    });
});