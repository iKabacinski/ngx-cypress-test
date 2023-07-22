describe('Forms test', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.selectFormFromMenu('Forms', 'Form Layouts');
  });


  it('should find all forms on the  page', () => {
    // tag: smoke
    cy.get('nb-card').should('have.length',6);


  });


});
