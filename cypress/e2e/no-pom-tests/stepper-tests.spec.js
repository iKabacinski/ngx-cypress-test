/// <reference types="cypress"/>

describe('Stepper form test', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.selectFormFromMenu('Layout','Stepper');
    });
    
    it('Should all steppers be on the page', () => {
        cy.url().should('include','pages/layout/stepper');
        cy.get('ngx-stepper')
            .find('nb-stepper').should('have.length', 3);
    });

    it.only('Should finish first process', () => {
        cy.get('nb-stepper[orientation="horizontal"]').within(()=>{

            cy.get('.header').find('div.step').first().should('have.class','selected');

            cy.contains('button','prev').should('be.disabled');
            cy.contains('button','next').should('be.enabled');

            cy.get('.step-content')
                .find('h3').should('have.text','Step content #1');
        });

    });
});
