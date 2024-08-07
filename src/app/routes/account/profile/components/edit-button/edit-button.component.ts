import { Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-edit-button',
    templateUrl: './edit-button.component.html',
    standalone: true
})
export class EditButtonComponent {
  // Output event emitter for notifying parent component about edit mode changes
  @Output() editModeChange = new EventEmitter<boolean>();
  // Flag to track edit mode
  editMode: boolean = false;

  // Method to toggle edit mode and emit the change event
  toggleEditMode() {
    // Toggle the edit mode flag
    this.editMode = !this.editMode;
    // Emit the edit mode change event with the updated edit mode value
    this.editModeChange.emit(this.editMode);
  }
}
