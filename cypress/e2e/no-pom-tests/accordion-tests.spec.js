/// <reference types="cypress"/>

describe('Accordions tests', () => {

    beforeEach(() => {

        cy.visit('/');
        cy.selectFormFromMenu('Layout', 'Accordion');
    });

    describe('First accotdion tests', () => {

        it('Should expand Product details', () => {
            cy.getByDataCy('toggle-item-button').should('exist').click().then(() => {
                cy.getByDataCy('first-accordion').within(() => {
                    cy.getByDataCy('product-details')
                        .findByDataCy('content').should('be.visible');
                })
            });
        });

        it.only('Should only one accoordion to be expanded', () => {
            cy.getByDataCy('first-accordion').within(()=>{
                cy.getByDataCy('product-details').findByDataCy('header').click();

                cy.getByDataCy('reviews').findByDataCy('header').click().then(()=>{
                    cy.getByDataCy('product-details').should('have.class','collapsed');
                });
            });
        });
    });

});