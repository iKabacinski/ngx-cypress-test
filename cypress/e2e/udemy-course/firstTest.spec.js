/// <reference types="cypress"/>

const { Input } = require("@angular/core");

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

    it('then and wrap methods', () => {
        
        
        
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

    // https://docs.cypress.io/api/commands/invoke#Function-with-Arguments
    it('invoke commend', () =>{
        
        //1
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address');

        //2 saving all result of cy.get
        cy.get('[for="exampleInputEmail1"]').then( label =>{
            expect(label.text()).to.equal('Email address');
        });

        //3 saving text from cy.get by using cy.invoke('text')
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text =>{
            expect(text).to.equal('Email address');
        });

        cy.contains('nb-card','Basic form')
            .find('nb-checkbox').click()
            .find('.custom-checkbox').invoke('attr','class')
            //.should('contain','checked'); //also working
            .then(classValue => {
                expect(classValue).to.contain('checked');
            } )
    })

    it.only('assert property and Datepickers handling', ()=>{

        cy.contains('Datepicker').click();

        let date = new Date();
        date.setDate(date.getDate()+ 4);
        let futureDate = date.getDate();
        console.log(futureDate);
        let futureMonth = date.toLocaleString('default' , {month:'short' });
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input =>{
                cy.wrap(input).click();
                
                //TODO 
                function selectFromCurrent(){

                    
                }
                //below code doesnt work properly :(
                cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then(dateAttribute => {
                    if(dateAttribute.includes(futureMonth)){
                        cy.get('[data-name="chevron-right"]').click()
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDate).click();
                    } else {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDate).click();
                }
            })
        })

        //static version
        // cy.contains('nb-card', 'Common Datepicker')
        //     .find('input').then(input =>{
        //         cy.wrap(input).click();
        //         cy.get('nb-calendar-day-picker').contains('17').click();
        //         cy.wrap(input).invoke('prop','value').should('contain','17');
        //     })
    })

    it('radio button handling',()=>{
        cy.contains('nb-card','Using the Grid').find('[type="radio"]')
            .then(radioButtons =>{
                cy.wrap(radioButtons)
                    .first()
                    .check({force:true}).should('be.checked');

                cy.wrap(radioButtons)
                    .eq(1)
                    .check({force:true});
                
                cy.wrap(radioButtons)
                    .first()
                    .should('not.be.checked');

                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled');
                
                })
    })

    it('checkboxes handling',()=>{
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').check({force:true});
        //check command only check checkboxes that are unchecked, if checkbox is already checked, check() will not "ucheck" alredy checked checkbox, it remains that checkbox checked
        // to uncheck use click() command :P  

        cy.get('[type="checkbox"]').eq(0).click({force:true});
        cy.get('[type="checkbox"]').eq(0).check({force:true});
        


    })

    it('lists and dropdowns', ()=> {
        //1
        // cy.get('nav nb-select').click();
        // cy.get('.options-list').contains("Dark").click();
        // cy.get('nav nb-select').should('contain','Dark');
        // cy.get('nb-layout-header nav').should('have.css','background-color','rgb(34, 43, 69)');

        //2
        
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim();

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click();
                cy.wrap(dropdown).should('contain',itemText);
                
                cy.get('nb-layout-header nav').should('have.css','background-color',colors[itemText]);
                if(index < 3)
                cy.wrap(dropdown).click();
 
            });
        });

    })

    it('Web tables', ()=>{
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //1 editing alredy existing value
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
            cy.wrap(tableRow).find('.nb-checkmark').click();

            cy.wrap(tableRow).find('td').eq(6).should('have.text','25');
        })

        //2 adding new value
        cy.get('thead').find('.nb-plus').click()

        cy.get('thead').find('tr').eq(2).then(tableRow =>{

            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Igor');
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Kabacinski');
            cy.wrap(tableRow).find('[placeholder="Username"]').type('isiu');
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type('igor.kabacinski@gmail.com');
            cy.wrap(tableRow).find('[placeholder="Age"]').type('26');

            cy.wrap(tableRow).find('.nb-checkmark').click();
        });

        cy.get('tbody tr').first().find('td').then(tableColumns =>{
            cy.wrap(tableColumns).eq(2).should('contain','Igor');
            cy.wrap(tableColumns).eq(3).should('contain','Kabacinski');
        });

        //3 searching 

        const age = [20,30,40,200];

        cy.wrap(age).each(age => {

            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(500);
            cy.get('tbody tr').each(tableRow => {
                if(age == 200) {
                    cy.wrap(tableRow).should('contain','No data found');
                } 
                else {
                    cy.wrap(tableRow).find('td').eq(6).should('have.text',age);
                }
            });
        });

        // cy.get('thead [placeholder="Age"]').type('20');
        // cy.wait(500);
        // cy.get('tbody tr').each(tablerow => {
        //     cy.wrap(tablerow).find('td').eq(6).should('have.text','20');
        // });

    })

})