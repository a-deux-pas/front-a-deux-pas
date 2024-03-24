import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Import the CloudinaryModule.
import { CloudinaryModule } from '@cloudinary/ng';

// Import the Cloudinary classes.
import { CloudinaryImage } from '@cloudinary/url-gen';
import { URLConfig } from '@cloudinary/url-gen';
import { CloudConfig } from '@cloudinary/url-gen';

@Component({
  selector: 'app-to-check',
  templateUrl: './to-check.component.html',
  styleUrl: './to-check.component.scss'
})
export class ToCheckComponent {
  img!: CloudinaryImage;

  ngOnInit() {

    // Set the Cloud configuration and URL configuration
    const cloudConfig = new CloudConfig({ cloudName: 'erikaadeuxpas' });
    const urlConfig = new URLConfig({ secure: true });

    // Instantiate and configure a CloudinaryImage object.
    this.img = new CloudinaryImage('docs/shoes', cloudConfig, urlConfig);

    // The URL of the image is: https://res.cloudinary.com/demo/image/upload/docs/shoes
  }

}
