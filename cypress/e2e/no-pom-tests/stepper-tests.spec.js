/// <reference types="cypress"/>

describe('Stepper form test', () => {
    
    let contents;

    before(() => {
        cy.fixture('steppersContent').then((steppersContent) => {
            contents = steppersContent;
        });
    });

    beforeEach(() => {    
        cy.visit('/');
        cy.selectFormFromMenu('Layout', 'Stepper');
    });

    it('Should all steppers be on the page', () => {
        cy.url().should('include', 'pages/layout/stepper');
        cy.get('ngx-stepper')
            .find('nb-stepper').should('have.length', 3);
    });

    it('Should finish first stepper', () => {
        cy.get('nb-stepper[orientation="horizontal"]').within(() => {

            cy.get('.header').find('div.step').first().should('have.class', 'selected');

            cy.get('.step-content')
                .find('h3').should('have.text', 'Step content #1');

            cy.contains('button', 'prev').should('be.disabled');
            cy.navigateToNextStepAndVerifyContent('Step content #2');

            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStepAndVerifyContent('Step content #3');

            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStepAndVerifyContent('Step content #4');

        });
    });

    it('Should finish second stepper', () => {
        cy.get('nb-stepper[orientation="vertical"]').within(() => {

            cy.get('.header').find('div.step').first().should('have.class', 'selected');

            cy.get('.step-content')
                .find('h3').should('have.text', 'Step content #1');

            cy.contains('button', 'prev').should('be.disabled');
            cy.navigateToNextStepAndVerifyContent('Step content #2',contents.secondStepper.stepperContent[1]);
           
            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStepAndVerifyContent('Step content #3',contents.secondStepper.stepperContent[2]);
            //TODO add second paragraph verification

            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStepAndVerifyContent('Step content #4',contents.secondStepper.stepperContent[3]);

        });
    });
});
