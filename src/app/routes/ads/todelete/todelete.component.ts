import { Component } from '@angular/core';

@Component({
  selector: 'app-todelete',
  templateUrl: './todelete.component.html',
  styleUrl: './todelete.component.scss'
})
export class TodeleteComponent {
  handleFileInputChange(event: { target: { files: any; }; }) {
    // Traitement du fichier sélectionné ici
    console.log(event.target.files);
  }

}
