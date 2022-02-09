import UserPage from '../page-objects/user.page';
import UniversalPages from '../page-objects/universal.pages';
import {FAKE_DATA} from "../testData/testData";

const universalPages = new UniversalPages();
const userPage = new UserPage();

export function clickAddNewUserBtn() {
    userPage.addUserBtn().click();
}

export function addNewUser() {
    userPage.userFirstNameField().type(FAKE_DATA.name);
    userPage.userLastNameField().type(FAKE_DATA.lastName);
    userPage.emailField().type(FAKE_DATA.email);
    userPage.userAge().type(FAKE_DATA.age);
    userPage.userSalary().type(FAKE_DATA.salary);
    userPage.userDepartment().type(FAKE_DATA.department);
    universalPages.submitBtn().click();
}

export function checkThatNewUserDataShouldBeDisplayedInDashboard(USERS_DATA) {
    for (let userData of USERS_DATA) {
        userPage.tableOfUsers().contains(FAKE_DATA.name).parent().contains(userData);
    }
}

export function editUserFromAnalytics() {
    userPage.tableOfUsers().contains(FAKE_DATA.name).parent().find('[id*="edit-record"]').click();
}

export function findUserInAnalytics(USERS_DATA) {
    for (let userData of USERS_DATA) {
        userPage.searchForm().clear().type(userData);
        userPage.searchBtn().click();
        userPage.tableOfUsers().contains(userData).should('be.exist');
    }
    userPage.searchForm().clear();
}


export function getCellTextAsArray() {
        let cellContents = [];
        return new Cypress.Promise(resolve => {
            cy.get('[class="rt-tr -odd"]').eq(0)
                .children()
                .each(($el, $index) => {
                    cellContents.push($el.text());
                })
                .then(() => resolve(cellContents));
        });
}

export function sort() {
    getCellTextAsArray().then(cellContents => {
        let actual = cellContents.slice();
        cy.wrap(actual).should("deep.eq", cellContents.sort());
    });
}



export function editUser(endpointName, endpointNumbers) {
    userPage.userFirstNameField().type(endpointName);
    userPage.userLastNameField().type(endpointName);
    userPage.emailField().clear().type(FAKE_DATA.email);
    userPage.userAge().type(endpointNumbers);
    userPage.userSalary().type(endpointNumbers);
    userPage.userDepartment().type(endpointName);
    universalPages.submitBtn().click();
}

export function deleteUserFromAnalytics() {
    userPage.tableOfUsers().contains(FAKE_DATA.name).parent().find('[id*="delete-record"]').click();
}

export function checkThatDeletedUserNotExistInAnalytics() {
    userPage.tableOfUsers().contains(FAKE_DATA.name).should('not.exist');
}