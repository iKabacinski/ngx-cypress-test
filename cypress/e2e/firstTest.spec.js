/// <reference types="cypress"/>

describe('Our first suite', () => {

    it('first test', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layout').click();
        
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

    it.only('Second test', () => {
        
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layout').click();
      
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



})