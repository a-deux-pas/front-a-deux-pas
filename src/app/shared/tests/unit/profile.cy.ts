import { HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from "../../../routes/account/profile/profile.component";
import { ProfileService } from "../../../routes/account/profile/profile.service";
import { SharedComponentsModule } from "../../components/shared-components.module";
import { MeetingPlacesComponent } from "../../../routes/account/profile/components/meeting-places/meeting-places.component";
import { RouterTestingModule } from "@angular/router/testing";

describe('Profile component', () => {
    beforeEach(() => {
      cy.intercept('http://localhost:8081/api/compte/profil/presentation', { fixture: 'user-profile' }).as('getUserPresentation');
      cy.intercept('http://localhost:8081/api/compte/profil/disponibilites', { fixture: 'user-preferred-schedule' }).as('getUserPreferredSchedules');
      cy.intercept('http://localhost:8081/api/compte/profil/lieux-de-rdv', { fixture: 'user-meeting-places' }).as('getPreferredMeetingPlaces');

    cy.mount(ProfileComponent, {
      declarations: [MeetingPlacesComponent],
      imports: [HttpClientModule, SharedComponentsModule, RouterTestingModule],
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




