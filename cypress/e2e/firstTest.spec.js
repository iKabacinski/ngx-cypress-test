/// <reference types="cypress"/>

describe('Our first suite', () => {

    beforeEach(() => {
        // root-level hook
        // runs before every test block

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layout').click();
      })

    it('first test', () => {

        
        //get by tag name
        cy.get('input');

        //get by id
        cy.get('#inputEmail');

        //get by Class name
        cy.get('.input-full-width');

        //get by Atrribute name
        cy.get('[placeholder]');

        //get by Attribute name and value
        cy.get('[placeholder="Email"]');

        
        //get by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        
        //get by tag name and Attribute with value
        cy.get('input[placeholder="Email"]');

        //get by 2 different attributes
        cy.get('[placeholder="Email"][type="email"]');
   
        //get by tag name, Attribute ,id and classname
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

        //get by e2e attributes
        cy.get('[data-cy="imputEmail1"]');

    })

    it('Second test', () => {
        
        cy.get('[data-cy="signInButton"]').click();

        cy.contains('Sign in').click();

        cy.contains('[status="warning"]','Sign in');

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();

        cy.contains('nb-card','Horizontal form').find('[type="email"]');
    })

    it.only('then and wrap methods', () => {

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email');
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password');

        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address');
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain','Password');

        // Selenium style, not gonna work because cypress works asynchronous :) 
        // const firstForm = cy.contains('nb-card', 'Using the Grid');
        // firstForm.find('[for="inputEmail1"]').should('contain','Email');
        // firstForm.find('[for="inputPassword2"]').should('contain','Password');

        //Cypress style
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emailLabelfirst = firstForm.find('[for="inputEmail1"]').text();
            const passwordLabelfirst = firstForm.find('[for="inputPassword2"]').text();
            
            expect(emailLabelfirst).to.equal('Email');
            expect(passwordLabelfirst).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then (secondForm => {
                
                const passwordSecondLabel = secondForm.find('[for="exampleInputPassword1"]').text();
                expect(passwordSecondLabel).to.equal(passwordLabelfirst);
                
                //back to cyppress context, wrap value from function parameter
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password');

            })
        })

    })

})