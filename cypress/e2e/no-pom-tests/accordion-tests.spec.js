/// <reference types="cypress"/>

describe('Accordions tests', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.selectFormFromMenu('Layout', 'Accordion');
  });

  describe('First accordion tests', () => {

    it('Should expand Product details after clicking button', () => {
      cy.getByDataCy('toggle-item-button').should('exist').click().then(() => {
        cy.getByDataCy('first-accordion').within(() => {
          cy.getByDataCy('product-details')
            .findByDataCy('content').should('be.visible');
        })
      });
    });

    it('Should only one accoordion to be expanded', () => {
      cy.getByDataCy('first-accordion').within(() => {
        cy.clickItemAndVerifyIfOtherAreCollapsed('reviews');
        cy.clickItemAndVerifyIfOtherAreCollapsed('product-details');
        cy.clickItemAndVerifyIfOtherAreCollapsed('edit');
        cy.clickItemAndVerifyIfOtherAreCollapsed('reviews');
      });
    });
  });

  describe('Second accordion tests', () => {

    it('All items expanded and the closed', () => {
      cy.openAllItemInOneAccordion('second-accordion');
      cy.closeAllItemInOneAccordion('second-accordion');
    });
  });
});
