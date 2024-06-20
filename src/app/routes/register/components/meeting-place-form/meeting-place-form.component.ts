import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreferredMeetingPlace } from '../../../../shared/models/user/preferred-meeting-place.model';
import { alreadyExistValidator } from '../../../../shared/utils/validators/custom-validators';
import { DisplayManagementService } from '../../../../shared/services/display-management.service';
import { escapeHtml } from '../../../../shared/utils/sanitizers/custom-sanitizers';

@Component({
  selector: 'app-meeting-place-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './meeting-place-form.component.html',
  styleUrl: './meeting-place-form.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class MeetingPlaceFormComponent implements OnInit {
  preferredMeetingPlaceForm!: FormGroup;
  preferredMeetingPlacesDisplay: PreferredMeetingPlace[] = [];
  isAddButtonClicked: boolean = true;
  @Output() addPreferredMeetingPlaces = new EventEmitter<PreferredMeetingPlace[]>();

  constructor(
    public profileForm: FormGroupDirective,
    private displayManagementService: DisplayManagementService
  ) {}

  ngOnInit() {
    this.preferredMeetingPlaceForm = this.profileForm.form;
    this.addPreferredMeetingPlaceFormGroup();
  }

  ngAfterViewInit(): void {
    this.displayManagementService.configureAddressAutofill();
  }

  ngAfterViewChecked(): void {
    this.displayManagementService.configureAddressAutofill();
  }

  addPreferredMeetingPlaceFormGroup() {
    const group = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        alreadyExistValidator(this.preferredMeetingPlacesDisplay, 'name')
      ]),
      street: new FormControl('', [Validators.required, alreadyExistValidator(this.preferredMeetingPlacesDisplay, 'street')]),
      postalCode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      city: new FormControl('', Validators.required),
      userId: new FormControl(localStorage.getItem('userId'))
    });
    this.preferredMeetingPlaceForm.addControl('preferredMeetingPlace', group);
  }

  get preferredMeetingPlaceFormGroup(): FormGroup {
    return this.preferredMeetingPlaceForm.get('preferredMeetingPlace') as FormGroup;
  }

  addPreferredMeetingPlace() {
    this.isAddButtonClicked = true;
    if (this.preferredMeetingPlaceFormGroup) {
      if (this.preferredMeetingPlaceFormGroup.valid) {
      // Sanitize values before pushing to preferredMeetingPlacesDisplay
      const sanitizedMeetingPlace = {
        name: escapeHtml(this.preferredMeetingPlaceFormGroup.get('name')?.value),
        street: escapeHtml(this.preferredMeetingPlaceFormGroup.get('street')?.value),
        postalCode: escapeHtml(this.preferredMeetingPlaceFormGroup.get('postalCode')?.value),
        city: escapeHtml(this.preferredMeetingPlaceFormGroup.get('city')?.value),
        userId: this.preferredMeetingPlaceFormGroup.get('userId')?.value
      };
      // save the form value for display
      this.preferredMeetingPlacesDisplay.push(sanitizedMeetingPlace);
      this.addPreferredMeetingPlaces.emit(this.preferredMeetingPlacesDisplay);
      // delete and reset the form
      this.deletePreferredMeetingPlaceForm();
      }
    } else {
      this.addPreferredMeetingPlaceFormGroup();
    }
  }

  deletePreferredMeetingPlace(meetingPlaceIndex: number) {
    this.preferredMeetingPlacesDisplay.splice(meetingPlaceIndex, 1);
    this.addPreferredMeetingPlaces.emit(this.preferredMeetingPlacesDisplay);
  }

  deletePreferredMeetingPlaceForm() {
    this.isAddButtonClicked = false;
    this.preferredMeetingPlaceFormGroup.reset();
    this.preferredMeetingPlaceForm.removeControl('preferredMeetingPlace');
  }
}
