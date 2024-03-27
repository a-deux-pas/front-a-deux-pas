import { MeetingPlacesComponent } from "../../../../routes/account/profile/components/meeting-places/meeting-places.component";
import userMeetingPlaces from "../../../../../../cypress/fixtures/user-meeting-places.json";

describe('user presentation component', () => {
  it('should display user information', () => {
    cy.mount(MeetingPlacesComponent,  {
      componentProperties: {
        preferredMeetingPlaces: userMeetingPlaces
      }
      }).then(() => {
        cy.get('.col-md-6:first-child .meeting-place').should('have.length', 3);

        cy.get('address').each((meetingPlace, index) => {
          cy.wrap(meetingPlace).find('.number').should('contain', index + 1);
        });

        cy.get('.address-name').each((meetingPlace, index) => {
          expect(meetingPlace).to.contain.text(userMeetingPlaces[index].name);
        });

        cy.get('.address-detail').each((meetingPlace, index) => {
          expect(meetingPlace).to.contain.text(userMeetingPlaces[index].street);
          expect(meetingPlace).to.contain.text(userMeetingPlaces[index].postalCode);
          expect(meetingPlace).to.contain.text(userMeetingPlaces[index].city);
        });

      });
    })
  })

