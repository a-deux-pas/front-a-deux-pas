import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PreferredSchedule } from '../../../../../shared/models/user/preferred-schedule.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-time-interval-picker',
  standalone: true,
  imports: [],
  templateUrl: './time-interval-picker.component.html',
  styleUrl: './time-interval-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeIntervalPickerComponent),
      multi: true,
    },
  ],
})
export class TimeIntervalPickerComponent
  implements OnChanges, ControlValueAccessor
{
  @Input() selectedDate: NgbDateStruct | undefined;
  @Input() sellerPreferredSchedules: PreferredSchedule[] | undefined;

  @Output() timeSelected = new EventEmitter<string>();

  selectedDateWeekDayIndex: number = -1;
  currentDayPreferredSchedules: PreferredSchedule[] | undefined;

  halfHourIntervals: string[] = [];

  selectedTime: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate']) {
      this.extractCurrentDayPreferredSchedules();
      this.generateHalfHourIntervalsForDisplay();
      this.selectedTime = null;
    }
  }

  setSelected(timeInterval: string) {
    this.selectedTime = timeInterval;
  }

  isSelected(timeInterval: string): boolean {
    return this.selectedTime === timeInterval;
  }

  private generateHalfHourIntervalsForDisplay() {
    this.formatIntervals();
    this.halfHourIntervals.sort((a, b) => a.localeCompare(b));
  }

  private formatIntervals() {
    this.halfHourIntervals = [];
    this.currentDayPreferredSchedules?.forEach((schedule) => {
      const start = parseInt(schedule.startTime.substring(0, 2));
      const end = parseInt(schedule.endTime.substring(0, 2));
      for (let i = start; i < end; i++) {
        this.halfHourIntervals.push(i < 10 ? `0${i} : 00` : `${i} : 00`);
        this.halfHourIntervals.push(i < 10 ? `0${i} : 30` : `${i} : 30`);
      }
    });
  }

  private extractCurrentDayPreferredSchedules() {
    this.currentDayPreferredSchedules = this.sellerPreferredSchedules?.filter(
      (schedule) => {
        return (
          schedule.daysOfWeek[0] ===
          this.getWeekDayIndexFromDate(this.selectedDate)
        );
      }
    );
  }

  private getWeekDayIndexFromDate(date: NgbDateStruct | undefined): number {
    if (date) {
      const jsDate = new Date(date.year, date.month - 1, date.day);
      return jsDate.getDay();
    }
    return -1;
  }

  onTimeSelect(selectedMeetingTime: string) {
    this.selectedTime = selectedMeetingTime;
    this.timeSelected.emit(this.selectedTime);
  }

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.selectedTime = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
