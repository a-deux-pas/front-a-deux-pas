// context('Connexion', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:4200');
//   });

//   it('Remplir le formulaire de connexion avec des données valides', () => {
//     cy.get('button.btn-connection').click();
//     cy.get('input[name="email"]').type('daouali@email.com');
//     cy.get('input[name="password"]').type('pass2');
//     cy.get('button.btn-success').click();
//     cy.get('.ngb-alert').should('contain', 'Connexion réussie.');
//   });

//   it('Remplir le formulaire de connexion avec des données invalides', () => {
//     cy.get('button.btn-connection').click();
//     cy.get('input[name="email"]').type('test@example.com');
//     cy.get('input[name="password"]').type('password123');
//     cy.get('button.btn-success').click();

//     cy.get('.alert')
//       .should('be.visible')
//       .should('contain', 'Une erreur est survenue. Veuillez réessayer.');
//   });
// });
