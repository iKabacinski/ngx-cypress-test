/// <reference types="cypress" />

Cypress.Commands.add('selectFormFromMenu', (firstOption, secondaryOption) => {
    cy.contains(firstOption).should('exist').click();
    cy.contains(secondaryOption).should('be.visible').click();
});

Cypress.Commands.add('navigateToNextStepAndVerifyContent', (title, content) => {
    cy.contains('button', 'next').should('be.enabled').click().then(() => {
        cy.get('.step-content')
            .find('h3').should('have.text', title);
        if (content) {
            cy.get('.step-content')
                .find('p').should('contain.text', (content));
        }
    });
});
