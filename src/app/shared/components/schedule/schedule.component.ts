import { Component , signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ProfileService } from '../../../routes/account/profile/profile.service';
import { PreferredSchedule } from '../../models/preferred-schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {
    //calendarVisible = signal(true);
    calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
    themeSystem: 'bootstrap5',
    headerToolbar: false,
    dayHeaderContent: function(arg) {
      return arg.date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase().replace(/\./g, '');
    },
    allDaySlot:false,
    firstDay: 1,
    editable: true,
    selectable: true,
    selectMirror: true,
    slotDuration:'01:00',
    slotMinTime: '08:00',
    slotMaxTime: '22:00',
    locale: 'fr',
    height: 395,
    slotLabelContent: (arg) => {
      const date = new Date(arg.date);
      const hour = date.getHours();
      return hour.toString(); // retourne uniquement l'heure sans la lettre "h"
    },
    select: this.handleTimeSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:

    eventChange:
    eventRemove:
    */
  };

  userPreferredSchedule: PreferredSchedule[] = [];
  currentEvents = signal<EventApi[]>([]);
  eventId: number = 0;

  constructor(private profileService: ProfileService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.profileService.getUserPreferredSchedule(3).subscribe((data: PreferredSchedule[]) => {
      const events: EventInput[] = data.map(preferredSchedule => ({
        id: this.createEventId(),
        //daysOfWeek: ["7"],
        title: 'Timed event',
        start: new Date().toISOString().replace(/T.*$/, '') + 'T' + preferredSchedule.startTime,
        end: new Date().toISOString().replace(/T.*$/, '') + 'T' + preferredSchedule.endTime
      }));
      this.calendarOptions.initialEvents = events;
      this.changeDetector.detectChanges();
      console.log(this.calendarOptions.initialEvents);
    });
  }

  createEventId() {
    return String(this.eventId++);
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleTimeSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

      calendarApi.addEvent({
        id: this.createEventId(),
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        color: "#ffbf6b"
      });

      console.log(selectInfo);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

}


