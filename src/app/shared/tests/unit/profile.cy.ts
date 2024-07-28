import { HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from "../../../routes/account/profile/profile.component";
import { ProfileService } from "../../../routes/account/profile/profile.service";
import { MeetingPlacesComponent } from "../../../routes/account/profile/components/meeting-places/meeting-places.component";
import { EditButtonComponent } from "../../../routes/account/profile/components/edit-button/edit-button.component";
import { API_URL } from "../../utils/constants/util-constants";
import { RouterModule } from "@angular/router";

let accountUrl = `${API_URL}`;

describe('Profile component', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('userId', '1');
      win.localStorage.setItem('userAlias', 'supercalifragilisticexpialidocious');
    });

    cy.intercept(`${accountUrl}users/supercalifragilisticexpialidocious/presentation*`, { fixture: 'user-profile' }).as('getUserPresentation');
    cy.intercept(`${accountUrl}users/1/alias-and-location*`, { fixture: 'user-profile' }).as('getUserPreferredSchedules');
    cy.intercept(`${accountUrl}account/profile/1/schedules*`, { fixture: 'user-preferred-schedule' }).as('getUserPreferredSchedules');
    cy.intercept(`${accountUrl}account/profile/1/meeting-places*`, { fixture: 'user-meeting-places' }).as('getPreferredMeetingPlaces');

    cy.mount(ProfileComponent, {
      imports: [MeetingPlacesComponent, EditButtonComponent, HttpClientModule, RouterModule.forRoot([])],
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
  });

  it('should trigger edit mode change event for schedule section', () => {
    cy.get('#schedule #edit-button-container .btn-icon').click();
    cy.get('@onEditModeChange').should('have.been.calledOnceWith', true, 'schedule');
    cy.get('#schedule #edit-button-container .save-icon').click();
  });

  it('should trigger edit mode change event for meeting places section', () => {
    cy.get('#meeting-places #edit-button-container .btn-icon').click();
    cy.get('@onEditModeChange').should('have.been.calledOnceWith', true, 'meeting-places');
    cy.get('#meeting-places #edit-button-container .save-icon').click();
  });
});
