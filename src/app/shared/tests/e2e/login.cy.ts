import { API_URL } from '../../utils/constants/utilsConstants';

let apiUrl = `${API_URL}api`;

describe('Login Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('should open the login modal', () => {
    // Check if modal is visible
    cy.get('#loginModal').should('be.visible');
  });

  it('should show error on invalid login', () => {
    cy.intercept('POST', `/${apiUrl}/login`, {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    }).as('loginRequest');

    // Enter invalid email and password
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Wait for the intercepted request and check for error message
    cy.wait('@loginRequest');
    cy.get('.alert-danger').should(
      'contain',
      "Une erreur s'est produite, veuillez réessayer plus tard"
    );
  });

  it('should successfully log in with valid credentials', () => {
    cy.intercept('POST', `/${apiUrl}/login`, {
      statusCode: 200,
      body: { success: true },
    }).as('loginRequest');

    cy.get('#openLoginModalButton', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Enter valid email and password
    cy.get('input[name="email"]').type('sdaouali@email.com');
    cy.get('input[name="password"]').type('pass2');
    cy.get('button[type="submit"]').click();

    // Wait for the intercepted request and check for success message
    cy.wait('@loginRequest');
    cy.get('.alert-success').should('contain', 'Succès! Connexion réussie!');

    // Check if navigate to logged-in home
    cy.url().should('include', '/logged-in-home'); // Adjust the URL based on your application's routing
  });
});
