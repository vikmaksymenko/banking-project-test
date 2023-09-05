import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in as a Bank Manager', function() {
    cy.visit('http://www.way2automation.com/angularjs-protractor/banking/#/manager');
});

