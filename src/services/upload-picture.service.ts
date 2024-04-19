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
    const uploadPreset = process.env['UPLOAD_PRESET'] || '';
    const cloudName = process.env['CLOUD_NAME'] || '';
    const callCloudinaryApi = process.env['CALL_TO_CLOUDINARY_API']

    if (!uploadPreset || !cloudName || !callCloudinaryApi) {
      throw new Error('UPLOAD_PRESET or CLOUD_NAME is not defined in the environment variables');
    }

    data.append('file', file);
    data.append('upload_preset', uploadPreset);
    data.append('cloud_name', cloudName);
    return this.http.post(callCloudinaryApi, data);
  }

  uploadImages(files: File[]): Observable<any[]> {
    const observables: Observable<any>[] = [];
    files.forEach(file => {
      observables.push(this.completeDataToUpload(file));
    });
    return forkJoin(observables);
  }
}
