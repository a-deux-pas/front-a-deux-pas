context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/compte/profil')

    cy.intercept('http://localhost:8081/api/compte/profil/presentation', { fixture: 'user-profile' }).as('getUserPresentation')
    cy.intercept('http://localhost:8081/api/compte/profil/disponibilites', { fixture: 'user-preferred-schedule' }).as('getUserPreferredSchedules')
    cy.intercept('http://localhost:8081/api/compte/profil/lieux-de-rdv', { fixture: 'user-meeting-places' }).as('getPreferredMeetingPlaces')

    cy.get('ul#account-tabs li').should('have.length', 4);

    cy.intercept('http://localhost:4200/compte/profil').as('profil')
    cy.intercept('http://localhost:4200/compte/annonces').as('annonces')
    cy.intercept('http://localhost:4200/compte/rdv').as('rdv')
    cy.intercept('http://localhost:4200/compte/favoris').as('favoris')
  })

  it('cy.go() - go back or forward in the browser\'s history', () => {
    // https://on.cypress.io/go

    cy.get('.custom-active-tab').contains('Mon profil').click()

    cy.location('pathname').should('include', '/compte/profil')

    cy.go('back')
    cy.location('pathname').should('not.include', '/compte/profil')

    cy.go('forward')
    cy.location('pathname').should('include', '/compte/profil')

    // cy.get('ul#account-tabs li').each(($li, index) => {
    //   cy.wrap($li).find('a').contains('Mes annonces').click();
    // });

    //cy.get('ul#account-tabs li[1]').contains('Mes annonces').click()
  //   cy.go('forward')
  //   cy.location('pathname').should('include', '/compte/annonces')
  })


})
