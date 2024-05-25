import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';

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
  }

  get notificationsFormGroup(): FormGroup {
    return this.notificationsForm.get('emailNotifications') as FormGroup;
  }

  toggleNotificationCheckboxes(value: boolean) {
    Object.keys(this.notificationsFormGroup.controls).forEach(key => {
      if (key !== 'notifications') {
        this.notificationsFormGroup.get(key)?.setValue(value);
      }
    });
  }
}
