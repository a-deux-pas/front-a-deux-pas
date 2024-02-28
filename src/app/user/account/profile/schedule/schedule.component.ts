import { Component , signal, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
    calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin],
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
  };


  constructor(private changeDetector: ChangeDetectorRef) {
  }

}
