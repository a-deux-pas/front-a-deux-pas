import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NgbCalendar,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {
  today = inject(NgbCalendar).getToday();

  model?: NgbDateStruct;
  date?: { year: number; month: number };
}
