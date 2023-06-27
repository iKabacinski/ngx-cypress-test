/// <reference types="cypress" />

Cypress.Commands.add('selectFormFromMenu', (firstOption, secondaryOption) => {
    cy.contains(firstOption).should('exist').click();
    cy.contains(secondaryOption).should('be.visible').click();
});

Cypress.Commands.add('navigateToNextStepAndVerifyContent', (title, firstParagraph, secondParagraph) => {
    cy.contains('button', 'next').should('be.enabled').click().then(() => {
        cy.get('.step-content')
            .find('h3').should('have.text', title);
        if (firstParagraph) {
            cy.get('.step-content')
                .find('p').first().should('contain.text', (firstParagraph));
        }
        if (secondParagraph) {
            cy.get('.step-content')
                .find('p').eq(1).should('contain.text', (secondParagraph));
        }
    });
});
