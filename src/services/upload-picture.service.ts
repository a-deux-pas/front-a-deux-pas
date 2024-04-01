import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadPictureService {

  constructor(private http: HttpClient) { }

  completeDataToUpload(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'adeupasProject');
    data.append('cloud_name', 'erikaadeuxpas');
    return this.http.post("https://api.cloudinary.com/v1_1/erikaadeuxpas/upload/", data);
  }

  uploadImages(files: File[]): Observable<any[]> {
    const observables: Observable<any>[] = [];
    files.forEach(file => {
      observables.push(this.completeDataToUpload(file));
    });
    return forkJoin(observables);
  }
}


