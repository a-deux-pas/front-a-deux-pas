import { Component , signal, ChangeDetectorRef, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ProfileService } from '../../../routes/account/profile/profile.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit, OnChanges {
  // Signal for tracking current events
  currentEvents = signal<EventApi[]>([]);
  // Unique event ID counter
  eventId: number = 0;
  // Array to hold events data
  Events: any[] = [];
  // Flag to track edit mode
  @Input() editMode!: boolean;

  // Calendar options configuration
  calendarOptions: CalendarOptions = ({
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
    themeSystem: 'bootstrap5',
    headerToolbar: false,
    dayHeaderContent: function(arg) {
      return arg.date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase().replace(/\./g, '');
    }, // display the day of the week
    slotLabelContent: (arg) => {
      const date = new Date(arg.date);
      const hour = date.getHours();
      return hour.toString(); // return the hour without the 'h' letter
    },
    allDaySlot: false,
    firstDay: 1,
    slotDuration:'01:00',
    slotMinTime: '08:00',
    slotMaxTime: '22:00',
    locale: 'fr',
    height: 401.5,
    contentHeight:'auto',
    displayEventTime: true,
    selectOverlap: false,
    select: this.handleTimeSelect.bind(this),
    eventsSet: this.handleEvents.bind(this),
    //eventDisplay: 'background',
  });

  constructor(private profileService: ProfileService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // Fetch user's preferred schedule data
    this.profileService.getUserPreferredSchedules().subscribe((data) => {
    // Map fetched data to events array
    this.Events = data.map(preferredSchedule => ({
        id: preferredSchedule.id.toString(),
        startTime: preferredSchedule.startTime,
        endTime: preferredSchedule.endTime,
        daysOfWeek: preferredSchedule.daysOfWeek,
      }));
      // Set events array to calendar options
      this.calendarOptions.events = this.Events;
      console.log("dans le schedule component " + this.editMode);
    });
  }

  // Generate unique event ID
  createEventId() {
    return String(this.eventId++);
  }

  // Handle edit mode change
  ngOnChanges(changes: SimpleChanges) {
    if (this.editMode) {
      // Enable calendar editing features
      this.calendarOptions.editable = true;
      this.calendarOptions.selectable = true;
      this.calendarOptions.selectMirror = true;
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);
    } else {
      // Enable calendar editing features
      this.calendarOptions.editable = false;
      this.calendarOptions.selectable = false;
      this.calendarOptions.selectMirror = false;
      this.calendarOptions.eventClick = undefined;
    }
  }

  // Handle event click
  // TODO : add pop-up and send the info to the back
  handleEventClick(clickInfo: EventClickArg) {
      // Ask for confirmation before deleting an event
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
  }

  // Handle time selection
  // TODO : send the data to the back
  handleTimeSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
      // clear date selection
      calendarApi.unselect();
       // Add a new event to the calendar
      calendarApi.addEvent({
        id: this.createEventId(),
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
  }

   // Handle events
  handleEvents(events: EventApi[]) {
      // Update current events signal
      this.currentEvents.set(events);
      // Trigger change detection to refresh the UI
      this.changeDetector.detectChanges();
  }
}


