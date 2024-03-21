import { Injectable } from '@angular/core';
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
}
