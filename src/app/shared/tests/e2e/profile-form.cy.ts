context('create account testing', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/inscription');
  });

  it('displays the profile-form component', () => {
    cy.get('form');
    cy.get('input[type=file]').click().should('be.enabled').click();
    cy.get('input[type=file]').selectFile('cypress/fixtures/images/pic-test-1-min.webp');

    cy.get('#alias').type('supercalifragilisticexpialidocious');
    cy.get('#bio').type('Even though the sound of it is something quite atrocious If you say it loud enough you\'ll always sound precocious Supercalifragilisticexpialidocious');
    cy.get('#street').type('rue du pays imaginaire');
    cy.get('#zip-code').type('20000');
    cy.get('#city').type('lieues-sous-les mers');

    cy.get('button[type=submit]').should('be.enabled').click()
    cy.get('form').submit()

    //Assert
    cy.get('input[type=file]').should('have.value', 'C:\\fakepath\\pic-test-1-min.webp');
  });

});
