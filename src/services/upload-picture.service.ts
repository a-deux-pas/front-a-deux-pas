import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Import the CloudinaryModule.
import { CloudinaryModule } from '@cloudinary/ng';

// Import the Cloudinary classes.
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

import { format } from "@cloudinary/url-gen/actions/delivery";
import { webp } from "@cloudinary/url-gen/qualifiers/format";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UploadPictureService {

  constructor(private http: HttpClient) { }


  uploadImage(vals: any): Observable<any> {
    let data = vals;
    data.format = 'svg'
    return this.http.post("https://api.cloudinary.com/v1_1/erikaadeuxpas/upload", data)
  }



  //   img!: CloudinaryImage;

  //   // Create and configure your Cloudinary instance.
  //   const cld = new Cloudinary({
  //     cloud: {
  //       cloudName: 'demo'
  //     }
  //   });

  // // Apply the transformation.
  // cld
  //   .delivery(format(webp()))
  //   .setDeliveryType("fetch");

}


