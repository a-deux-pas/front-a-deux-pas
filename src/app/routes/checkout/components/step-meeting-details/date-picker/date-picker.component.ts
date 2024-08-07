import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { PreferredSchedule } from '../../../../../shared/models/user/preferred-schedule.model';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  selectedDate: NgbDateStruct | undefined;
  model: NgbDateStruct | undefined;

  dayIndexesArr: number[] = [];

  @Input() sellerPreferredSchedules: PreferredSchedule[] | undefined;
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();

  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
  daysOfCurrentMonth: NgbDateStruct[] = [];
  daysInRange: NgbDateStruct[] = [];

  constructor() {
    this.startDate = this.getTomorrowDate();
    this.endDate = this.getDateTwoWeeksFromNow();
  }

  ngOnInit() {
    this.extractSellerPreferredDayIndexes();
    this.extractDateRangeDays();
    this.selectedDate = this.daysInRange.find((day) => this.isSelectable(day));
    this.dateSelected.emit(this.selectedDate);
    this.model = this.selectedDate;
  }

  private getTomorrowDate(): NgbDateStruct {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return {
      year: tomorrow.getFullYear(),
      month: tomorrow.getMonth() + 1,
      day: tomorrow.getDate(),
    };
  }

  private extractDateRangeDays() {
    const start = new Date(
      this.startDate.year,
      this.startDate.month - 1,
      this.startDate.day
    );
    const end = new Date(
      this.endDate.year,
      this.endDate.month - 1,
      this.endDate.day
    );

    let current = start;
    while (current <= end) {
      this.daysInRange.push({
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate(),
      });
      current.setDate(current.getDate() + 1);
    }
  }

  isSelectable(date: NgbDateStruct): boolean {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const start = new Date(
      this.startDate.year,
      this.startDate.month - 1,
      this.startDate.day
    );
    const end = new Date(
      this.endDate.year,
      this.endDate.month - 1,
      this.endDate.day
    );
    return (
      jsDate >= start &&
      jsDate <= end &&
      this.dayIndexesArr.includes(jsDate.getDay())
    );
  }

  isSelectedDate(date: NgbDateStruct): boolean {
    return (
      date.year === this.selectedDate?.year &&
      date.month === this.selectedDate.month &&
      date.day === this.selectedDate.day
    );
  }

  onDateSelect(date: NgbDateStruct) {
    if (this.isSelectable(date)) {
      this.selectedDate = date;
      this.model = date;
      this.dateSelected.emit(this.selectedDate);
    }
  }

  private extractSellerPreferredDayIndexes() {
    this.dayIndexesArr = [];
    this.sellerPreferredSchedules?.forEach((schedule) => {
      this.dayIndexesArr.push(schedule.daysOfWeek[0]);
    });
  }

  private getDateTwoWeeksFromNow(): NgbDateStruct {
    const today = new Date();
    const twoWeeksFromNow = new Date(today);
    twoWeeksFromNow.setDate(today.getDate() + 14);

    return {
      year: twoWeeksFromNow.getFullYear(),
      month: twoWeeksFromNow.getMonth() + 1,
      day: twoWeeksFromNow.getDate(),
    };
  }

  // ControlValueAccessor interface method implementations
  // Needed for custom components used in Angular Forms
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: NgbDateStruct): void {
    this.selectedDate = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
