import { ProfileFormComponent } from "../../../routes/register/profile-form/profile-form.component";
import { PreferredMeetingPlace } from "../../models/user/preferred-meeting-place.model";
import { User } from "../../models/user/user.model";

context('create account testing', () => {
  beforeEach(function() {
      cy.fixture('user-profile').then((user) => {
        this['user'] = user as User;
      })
      cy.fixture('user-meeting-places').then((userMeetingPlaces) => {
        this['userMeetingPlaces'] = userMeetingPlaces as PreferredMeetingPlace[];
      })
      cy.mount(ProfileFormComponent, {
        imports: [],
        providers: [],
      })
  });

  it('should be possible to submit the form', function() {

    // it should be possible to select a profile picture
    cy.get('form');
    cy.get('input[type=file]').click().should('be.enabled').click();
    cy.get('input[type=file]').selectFile('cypress/fixtures/images/pic-test-1-min.webp');
    cy.get('input[type=file]').should('have.value', 'C:\\fakepath\\pic-test-1-min.webp');

    // it should be possible to enter user information
    cy.get('#alias').type(this['user'].alias);
    cy.get('#bio').type(this['user'].bio);
    cy.get('div#address input#street').type(this['user'].street);
    cy.get('div#address input#postal-code').type(this['user'].postalCode);
    cy.get('div#address input#city').type(this['user'].city);

    // it should be possible to enter several preferred meeting places
    (this['userMeetingPlaces']as PreferredMeetingPlace[]).forEach((meetingPlace, index) => {
      if (index > 0) {
        // add a new form
        cy.get('#add-address-icon').click();
      }
      cy.get('div#preferred-meeting-places input#name').clear().type(meetingPlace.name);
      cy.get('div#preferred-meeting-places input#street').clear().type(meetingPlace.street);
      cy.get('div#preferred-meeting-places input#postal-code').clear().type(meetingPlace.postalCode);
      cy.get('div#preferred-meeting-places input#city').clear().type(meetingPlace.city);
      cy.get('#add-address-icon').click();
    });
    cy.get('.meeting-place').should('have.length', 5);


    cy.get('button[type=submit]').should('be.enabled').click()
    cy.get('form').submit()

  });
});
