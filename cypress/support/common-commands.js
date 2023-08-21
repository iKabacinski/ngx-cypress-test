/// <reference types="cypress" />

const { Subject } = require("rxjs");

Cypress.Commands.add('selectFormFromMenu', (firstOption, secondaryOption) => {
    cy.contains(firstOption).should('exist').click();
    cy.contains(secondaryOption).should('be.visible').click();
});

Cypress.Commands.add('getByDataCy', (selector, options) => {
    return cy.get(`[data-cy="${selector}"]`, options);
});

Cypress.Commands.add('findByDataCy', { prevSubject: true }, (subject, selector, options) => {
    return subject.find(`[data-cy="${selector}"]`, options);
});
