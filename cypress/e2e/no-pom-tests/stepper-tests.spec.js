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

            cy.verifyTitle('Step content #1');

            cy.contains('button', 'prev').should('be.disabled');
            cy.navigateToNextStep().then(() => {
                cy.verifyTitle('Step content #2');
            });
            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStep().then(() => {
                cy.verifyTitle('Step content #3');
            });

            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStep().then(() => {
                cy.verifyTitle('Step content #4');
                cy.contains('button', 'next').should('be.disabled');
            });

        });
    });

    it('Should finish second stepper', () => {
        cy.get('.steppers-container').find('nb-stepper.horizontal').within(() => {

            cy.contains('button', 'prev').should('not.exist');
            cy.verifyContent(contents.secondStepper.content[0]);
            cy.get('.form-control').type(contents.secondStepper.inputValue[0]);

            cy.navigateToNextStep().then(() => {
                cy.verifyContent(contents.secondStepper.content[1]);
                cy.get('.form-control').type(contents.secondStepper.inputValue[1]);
            });

            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStep().then(() => {
                cy.verifyContent(contents.secondStepper.content[2]);
                cy.get('.form-control').type(contents.secondStepper.inputValue[2]);
            });

            cy.contains('button', 'prev').should('be.enabled');
            cy.contains('button', 'Confirm').should('be.exist').and('be.enabled').click().then(() => {
                cy.verifyTitle(contents.secondStepper.successMessege)
            });

            cy.contains('button', 'Try again').should('exist').click().then(() => {
                cy.contains('button', 'prev').should('not.exist');
                cy.verifyContent(contents.secondStepper.content[0]);
            });
        });
    });


    it('Should finish third stepper', () => {
        cy.get('nb-stepper[orientation="vertical"]').within(() => {

            cy.contains('button', 'prev').should('be.disabled');
            cy.verifyTitle('Step content #1');
            cy.verifyContent(contents.thirdStepper.firstParagraph[0]);

            cy.navigateToNextStep().then(() => {
                cy.verifyTitle('Step content #2');
                cy.verifyContent(contents.thirdStepper.firstParagraph[1]);
            });

            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStep().then(() => {
                cy.verifyTitle('Step content #3');
                cy.verifyContent(contents.thirdStepper.firstParagraph[2], contents.thirdStepper.secondParagraph[0]);
            });

            cy.contains('button', 'prev').should('be.enabled');
            cy.navigateToNextStep().then(() => {
                cy.verifyTitle('Step content #4');
                cy.verifyContent(contents.thirdStepper.firstParagraph[3]);
            });
            cy.contains('button', 'next').should('be.disabled');

        });
    });
});
