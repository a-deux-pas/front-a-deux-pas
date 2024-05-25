import { Component , signal, ChangeDetectorRef, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PreferredSchedule } from '../../models/user/preferred-schedule.model';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    standalone: true,
    imports: [FullCalendarModule]
})
export class ScheduleComponent implements OnChanges {
  // Signal for tracking current events
  currentSchedules = signal<EventApi[]>([]);
  // Unique event ID counter
  eventId: number = 0;
  // Array to hold events data
  @Input() preferredSchedules!: any[];
  @Output() addPreferredSchedules = new EventEmitter<PreferredSchedule[]>();
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
    // for mobile devices
    longPressDelay: 50,
    eventLongPressDelay: 50,
    selectLongPressDelay: 50,
  });

  constructor(private changeDetector: ChangeDetectorRef) {}

  // Handle edit mode change
  ngOnChanges(changes: SimpleChanges) {
    this.calendarOptions.events = this.preferredSchedules;
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

  // Generate unique event ID
  createEventId() {
    return String(this.eventId++);
  }

  // Handle event click
  // TODO : add style to the pop-up
  handleEventClick(clickInfo: EventClickArg) {
      // Ask for confirmation before deleting an event
      if (confirm(`Are you sure you want to delete this event`)) {
        clickInfo.event.remove();
      }
  }

  // Handle time selection
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
    this.currentSchedules.set(events);
    // Trigger change detection to refresh the UI
    this.changeDetector.detectChanges();

    const newPreferredSchedules: PreferredSchedule[] = [];

    events.forEach((event) => {
      const newPreferredSchedule = new PreferredSchedule(
        Number(event.id), // id
        [event.start!.getDay()], // daysOfWeek
        event.startStr.split('T')[1].split('+')[0], // startTime
        event.endStr.split('T')[1].split('+')[0],  // endTime
        1 // userId
      );

      newPreferredSchedules.push(newPreferredSchedule);
    });

    this.addPreferredSchedules.emit(newPreferredSchedules);
  }
}
