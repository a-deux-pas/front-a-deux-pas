import { API_URL } from "../../utils/constants/util-constants";

let apiUrl = `${API_URL}account/profile`;

context('account tabs testing', () => {
  beforeEach(() => {
    cy.setLoggedIn();

    cy.intercept(`${apiUrl}/presentation*`, { fixture: 'user-profile' }).as('getUserPresentation');
    cy.intercept(`${apiUrl}/schedules*`, { fixture: 'user-preferred-schedule' }).as('getUserPreferredSchedules');
    cy.intercept(`${apiUrl}/meeting-places*`, { fixture: 'user-meeting-places' }).as('getPreferredMeetingPlaces');
    // TODO add interceptor for each route one created

    cy.visit('http://localhost:4200/compte/profil');
    cy.url().should('include', '/compte/profil');
    cy.get('ul#account-tabs li').should('have.length', 4);
  });

  it('should not be visible on mobile version', () => {
    cy.viewport(500, 500);
    cy.get('ul#account-tabs').should('not.be.visible');
  });

  it('checks profile tab functionality', () => {

    cy.get('.custom-active-tab').contains('Mon profil').click()

    cy.location('pathname').should('include', '/compte/profil')

    cy.go('back')
    cy.location('pathname').should('not.include', '/compte/profil')

    cy.go('forward')
    cy.location('pathname').should('include', '/compte/profil')
  });

  it('checks adds tab functionality', () => {

    cy.visit('http://localhost:4200/compte/annonces')

    cy.get('.custom-active-tab').contains('Mes annonces').click()

    cy.location('pathname').should('include', '/compte/annonces')

    cy.go('back')
    cy.location('pathname').should('not.include', '/compte/annonces')

    cy.go('forward')
    cy.location('pathname').should('include', '/compte/annonces')
  });

  it('checks meetings tab functionality', () => {

    cy.visit('http://localhost:4200/compte/rdv')

    cy.get('.custom-active-tab').contains('Mes RDV').click()

    cy.location('pathname').should('include', '/compte/rdv')

    cy.go('back')
    cy.location('pathname').should('not.include', '/compte/rdv')

    cy.go('forward')
    cy.location('pathname').should('include', '/compte/rdv')
  });

  it('checks favorites tab functionality', () => {

    cy.visit('http://localhost:4200/compte/favoris')

    cy.get('.custom-active-tab').contains('Mes favoris').click()

    cy.location('pathname').should('include', '/compte/favoris')

    cy.go('back')
    cy.location('pathname').should('not.include', '/compte/favoris')

    cy.go('forward')
    cy.location('pathname').should('include', '/compte/favoris')
  });
});
