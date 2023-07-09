Cypress.Commands.add('clickItemAndVerifyIfOtherAreCollapsed', (item) => {
    cy.getByDataCy(item).findByDataCy('header').click().then(() => {
        cy.get('nb-accordion-item').not(`[data-cy="${item}"]`).should('have.class', 'collapsed');
    });
});

Cypress.Commands.add('openAllItemInOneAccordion', (accordion) => {
    cy.getByDataCy(accordion).within(() => {
        cy.get('nb-accordion-item-header').click({ multiple: true }).then(() => {
            cy.get('nb-accordion-item').should('have.class', 'expanded');
        });
    });
});

Cypress.Commands.add('closeAllItemInOneAccordion', (accordion) => {
    cy.getByDataCy(accordion).within(() => {
        cy.get('nb-accordion-item-header').click({ multiple: true }).then(() => {
            cy.get('nb-accordion-item').should('have.class', 'collapsed');
        });
    });
});
