import { ACCOUNT_BASE_URL, AD_BASE_URL, MEETING_BASE_URL, USER_BASE_URL } from "../../utils/constants/util-constants";

context('account tabs testing', () => {
  beforeEach(() => {
    cy.setLoggedIn();

    cy.window().then((win) => {
      win.localStorage.setItem('userId', '1');
      win.localStorage.setItem('userAlias', 'supercalifragilisticexpialidocious');
    });

    cy.intercept(`${USER_BASE_URL}/supercalifragilisticexpialidocious/presentation*`, { fixture: 'user-profile' }).as('getUserPresentation');
    cy.intercept(`${USER_BASE_URL}/1/alias-and-location*`, { fixture: 'user-profile' }).as('getUserPreferredSchedules');
    cy.intercept(`${ACCOUNT_BASE_URL}/1/schedules*`, { fixture: 'user-preferred-schedule' }).as('getUserPreferredSchedules');
    cy.intercept(`${ACCOUNT_BASE_URL}/1/meeting-places*`, { fixture: 'user-meeting-places' }).as('getPreferredMeetingPlaces');
    cy.intercept(`${AD_BASE_URL}/adTablist/1*`, { fixture: 'user-profile' }).as('getAdsList');
    cy.intercept(`${AD_BASE_URL}/favorites/1*`, { fixture: 'user-profile' }).as('getFavoritesAdsList');
    cy.intercept(`${MEETING_BASE_URL}/proposed/1*`, { fixture: 'user-profile' }).as('getMeetingsList');

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
