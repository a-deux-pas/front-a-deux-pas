import { ScheduleComponent } from "../../components/schedule/schedule.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import userPreferredSchedule from "../../../../../cypress/fixtures/user-preferred-schedule.json";

describe('schedule component', () => {
  it('should display user schedule', () => {
    cy.mount(ScheduleComponent, {
      imports: [FullCalendarModule],
      componentProperties: {
        preferredSchedules: userPreferredSchedule,
        editMode: true,
      },
    }).then(() => {
      cy.get('.fc').should('exist');
      cy.get('.fc-event').should('have.length', 12);
    // Assuming there's an event on the calendar
    // Simulate clicking the event
    cy.get('.fc-event').first().click();
    // Confirm the deletion dialog
    cy.on('window:confirm', () => true);
    // Assert that the event is removed
    cy.get('.fc-event').should('have.length', 11);
    });
  });
});





