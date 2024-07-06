import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-time-interval-picker',
  standalone: true,
  imports: [],
  templateUrl: './time-interval-picker.component.html',
  styleUrl: './time-interval-picker.component.scss',
})
export class TimeIntervalPickerComponent {
  @Input()
  publisher: any;

  // replace with publisher.preferredSchedules
  intervals: string[] = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ];
}
