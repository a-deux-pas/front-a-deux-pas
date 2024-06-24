import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, of, retry } from 'rxjs';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class UploadPictureService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService) { }
  /**
   * This method send all the data needed in order to proceed to a call to the cloudinary API
   * The upload_preset defines a set of action to perform upon the upload of a resource
   * while the cloud name is a string that is used in the URLs of media delivered to Cloudinary
   * Both these data can be public
   * @param file
   * @returns
   */
  completeDataToUpload(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', `adeupasProject`);
    data.append('cloud_name', `erikaadeuxpas`);
    return this.http.post(`https://api.cloudinary.com/v1_1/erikaadeuxpas/upload/`, data)
      .pipe(
        retry(1),
        catchError(this.handleErrorService.handleError)
      );
  }

  uploadImages(files: File[]): Observable<any[]> {
    const observables: Observable<any>[] = [];
    files.forEach(file => {
      observables.push(this.completeDataToUpload(file));
    });
    return forkJoin(observables);
  }
}
