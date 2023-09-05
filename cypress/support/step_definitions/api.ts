import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * In general, we expect user data to be stored in some database.
 * However, this app uses Local storage object User for this purpose.
 * So, we modify it instead.
 *
 * Also, the local storage is not shared between browser sessions,
 * so we don't need to worry about the shared resources between tests.
 */

Given('There is no customer {string}', function(name: string) {
    /**
     * We may simply delete the User from the local storage
     * However, it will delete ALL the created users, which does not match the step name.
     * Also, Cypress cleans up the Local Storage, so the step is redundant as a precondition
     */

    cy.window().then(win => {
        const existingUsers = JSON.parse(win.localStorage.getItem('User'));

        for (const [id, user] of Object.entries(existingUsers)) {
            if (`${user['fName']} ${user['lName']}` === name) {
                delete existingUsers[id];
            }
        }

        win.localStorage.setItem('User', JSON.stringify(existingUsers));
    });

    cy.reload();
});

Given('There is a customer {string}', function(name: string) {
    /**
     * Adding a new user data to the local storage record User
     * Using a hardcoded postcode, as it is not important for the test
     */

    const [firstName, lastName] = name.split(' ');

    cy.window().then(win => {
        const existingUsers = JSON.parse(win.localStorage.getItem('User'));
        const maxUserId = parseInt(win.localStorage.getItem('maxUserId'));

        const id = maxUserId + 1;
        existingUsers[id.toString()] = {
            "fName": firstName,
            "lName": lastName,
            "postCd": '12345',
            "id": id,
            "date": new Date().toISOString()
        };

        win.localStorage.setItem('User', JSON.stringify(existingUsers));
        win.localStorage.setItem('maxUserId', id.toString());
    });

    cy.reload();
});

Then('There should not be customer {string} in the system', function(name: string) {
    /**
     * This method is used to check customer deletion.
     * We may simply check that the customer is not in the table,
     * But it is slower and does not check the data storage.
     */

    cy.window().then(win => {
        const existingUsers = JSON.parse(win.localStorage.getItem('User'));
        const filtered = Object.values(existingUsers).filter(user => `${user['fName']} ${user['lName']}` === name);
        expect(filtered).to.be.empty;
    });
});