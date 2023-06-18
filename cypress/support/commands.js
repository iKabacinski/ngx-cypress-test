/// <reference types="cypress" />

Cypress.Commands.add('selectFormFromMenu',  (firstOption, secondaryOption)=>{
    cy.contains(firstOption).should('exist').click();
    cy.contains(secondaryOption).should('be.visible').click();
});