import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  @ViewChild('fullcalendar') fullCalendarComponent!: FullCalendarComponent;
  calendarOptions!: CalendarOptions;
  months: string[] = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  years: number[] = [];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  ngOnInit() {
    this.populateYears();
    this.initCalendarOptions();
  }

  populateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  initCalendarOptions() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      themeSystem: 'bootstrap5',
      headerToolbar: {
        left: 'prev,next today',
        center: '',
        right: 'customMonthDropdown,customYearDropdown',
      },
      customButtons: {
        customMonthDropdown: {
          text: this.months[this.currentMonth],
          click: () => {
            this.showMonthDropdown();
          },
        },
        customYearDropdown: {
          text: this.currentYear.toString(),
          click: () => {
            this.showYearDropdown();
          },
        },
      },
      titleFormat: { year: 'numeric', month: 'long' },
      dayHeaderContent: (arg) => {
        return arg.date
          .toLocaleDateString('fr-FR', { weekday: 'short' })
          .toUpperCase();
      },
      dayCellClassNames: (arg) => {
        if (arg.date.getDay() === 0 || arg.date.getDay() === 6) {
          return 'highlight'; // Highlight weekends
        }
        return '';
      },
      firstDay: 1,
      locale: 'fr',
      height: 'auto',
    };
  }

  showMonthDropdown() {
    // Implement logic to show a custom month dropdown
    // When a month is selected, update `this.currentMonth` and refresh the calendar
  }

  showYearDropdown() {
    // Implement logic to show a custom year dropdown
    // When a year is selected, update `this.currentYear` and refresh the calendar
  }

  updateCalendar() {
    // Update the calendar to reflect the selected month and year
    const calendarApi = this.fullCalendarComponent.getApi();
    calendarApi.gotoDate(new Date(this.currentYear, this.currentMonth, 1));
  }
}
