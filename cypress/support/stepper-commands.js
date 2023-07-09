Cypress.Commands.add('verifyContent', (firstParagraph, secondParagraph) => {
    cy.get('.step-content')
        .find('p').first().should('contain.text', (firstParagraph));
    if (secondParagraph) {
        cy.get('.step-content')
            .find('p').eq(1).should('contain.text', (secondParagraph));
    }
});

Cypress.Commands.add('navigateToNextStep', () => {
    cy.contains('button', 'next').should('be.enabled').click()
});

Cypress.Commands.add('verifyTitle', (title) => {
    cy.get('.step-content')
        .find('h3').should('have.text', title);
});