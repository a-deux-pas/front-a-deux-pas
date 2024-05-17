import { HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from "../../../routes/account/profile/profile.component";
import { ProfileService } from "../../../routes/account/profile/profile.service";
import { MeetingPlacesComponent } from "../../../routes/account/profile/components/meeting-places/meeting-places.component";
import { RouterTestingModule } from "@angular/router/testing";
import { EditButtonComponent } from "../../../routes/account/profile/components/edit-button/edit-button.component";
import { API_URL } from "../../utils/constants/utils-constants";

let apiUrl = `${API_URL}api/account/profile`;

describe('Profile component', () => {
  beforeEach(() => {
    cy.intercept(`${apiUrl}/presentation`, { fixture: 'user-profile' }).as('getUserPresentation');
    cy.intercept(`${apiUrl}/schedules`, { fixture: 'user-preferred-schedule' }).as('getUserPreferredSchedules');
    cy.intercept(`${apiUrl}/meeting-places`, { fixture: 'user-meeting-places' }).as('getPreferredMeetingPlaces');

    cy.mount(ProfileComponent, {
      imports: [MeetingPlacesComponent, EditButtonComponent, HttpClientModule, RouterTestingModule],
      providers: [ProfileService],
      componentProperties: {
        onEditModeChange: cy.spy().as('onEditModeChange'),
      },
    }).then(() => {
      cy.wait('@getUserPresentation').its('response.statusCode').should('eq', 200);
      cy.wait('@getUserPreferredSchedules').its('response.statusCode').should('eq', 200);
      cy.wait('@getPreferredMeetingPlaces').its('response.statusCode').should('eq', 200);
    });
  });

  it('should trigger edit mode change event for presentation section', () => {
    cy.get('#presentation #edit-button-container .btn-icon').click();
    cy.get('@onEditModeChange').should('have.been.calledOnceWith', true, 'presentation');
    cy.get('#presentation #edit-button-container .save-icon').click();
    //TODO : check if data saved
  });

  it('should trigger edit mode change event for schedule section', () => {
    cy.get('#schedule #edit-button-container .btn-icon').click();
    cy.get('@onEditModeChange').should('have.been.calledOnceWith', true, 'schedule');
    cy.get('#schedule #edit-button-container .save-icon').click();
    //TODO : check if data saved
  });

  it('should trigger edit mode change event for meeting places section', () => {
    cy.get('#meeting-places #edit-button-container .btn-icon').click();
    cy.get('@onEditModeChange').should('have.been.calledOnceWith', true, 'meeting-places');
    cy.get('#meeting-places #edit-button-container .save-icon').click();
    //TODO : check if data saved
  });
});
