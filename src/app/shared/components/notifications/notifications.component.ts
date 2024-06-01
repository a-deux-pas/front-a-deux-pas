import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class NotificationsComponent implements OnInit {
  notificationsForm: any;
  notificationId: number = 0;
  notifications: Array<string> = [];
  @Output() addNotifications = new EventEmitter<Array<string>>();

  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit() {
    this.notificationsForm = this.parentForm.form;
    this.notificationsForm.addControl(
      'emailNotifications',
      new FormGroup({
        notifications: new FormControl(false),
        meetingProposal: new FormControl(false),
        meetingUpdate: new FormControl(false),
        meetingReminder: new FormControl(false),
        meetingToFinalize: new FormControl(false),
        meetingCancelled: new FormControl(false),
      })
    );

    this.notificationsFormGroup.get('notifications')?.valueChanges.subscribe(value => {
      this.toggleNotificationCheckboxes(value);
    });

    this.notificationsFormGroup.valueChanges.subscribe(() => {
      this.getNotifications();
    });
  }

  get notificationsFormGroup(): FormGroup {
    return this.notificationsForm.get('emailNotifications') as FormGroup;
  }

  getNotifications() {
    this.notifications = [];

    Object.keys(this.notificationsFormGroup.controls).forEach(controlName => {
      const value = this.notificationsFormGroup.get(controlName)?.value;
      if (value && controlName !== "notifications") {
        this.notifications.push(controlName);
      }
    });

    this.addNotifications.emit(this.notifications);
  }

  toggleNotificationCheckboxes(value: boolean) {
    Object.keys(this.notificationsFormGroup.controls).forEach(key => {
      if (key !== 'notifications') {
        this.notificationsFormGroup.get(key)?.setValue(value);
      }
    });
  }
}
