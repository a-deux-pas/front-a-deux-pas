context('create new ad testing', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/inscription')
      //cy.url().should('include', 'Userid');
  });

  it('displays the register-details-form component', () => {
    cy.get('p').should('have.length', 2)
  });

});
