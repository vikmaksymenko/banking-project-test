Feature: User management by bank manager
    As a bank manager
    I want to add a new customer and delete customer

    # The task describes the feature as a single scenario
    # However, I splited it into two scenarios, 
    # one for adding a customer and one for deleting a customer
    # because it allows to test adding and delition separately.
    # Also, this eliminates tests dependency.
    
    Background: 
        Given I am logged in as a Bank Manager

    Scenario: Add customer
        Given There is no customer "Dobby Freeelf"
        When I open the "Add Customer" page
        And I add customer "Dobby Freeelf" with post code "123456"
        Then I should see the customer added alert

        When I open the "Customers" page
        Then I should see the customer "Dobby Freeelf" with post code "123456"

    Scenario: Delete customer
        Given There is a customer "Lord Voldemort"
        When I open the "Customers" page
        And I delete the customer "Lord Voldemort"	
        Then I should not see customer "Lord Voldemort"
        And There should not be customer "Lord Voldemort" in the system
