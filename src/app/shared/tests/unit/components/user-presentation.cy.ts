import { UserPresentationComponent } from "../../../components/user-presentation/user-presentation.component";

describe('user presentation component', () => {
  it('should display user information', () => {
    cy.fixture('user-profile').then((user) => {
      user.inscriptionDate = new Date(user.inscriptionDate).toLocaleDateString('fr-FR');
    cy.mount(UserPresentationComponent,  {
      componentProperties: {
        user: user
      }
      }).then(() => {
        cy.get('img').should('have.attr', 'src').should('contain', user.profilePicture);
        cy.get('#user-info p').eq(0).should('contain', user.alias);
        cy.get('#user-info p').eq(1).should('contain', user.city);
        cy.get('#user-info p').eq(2).should('contain', user.inscriptionDate);
        cy.get('p').should('contain', user.bio);
      });
    })
  })
})
