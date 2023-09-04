describe('Forms test', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.selectFormFromMenu('Forms', 'Form Layouts');
  });


  it('should find all forms on the  page', () => {
    cy.get('nb-card').should('have.length',6);
  });


});
