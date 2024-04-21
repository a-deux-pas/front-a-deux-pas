// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, forkJoin } from 'rxjs';
// import { UPLOAD_PRESET, CLOUD_NAME, CALL_TO_CLOUDINARY_API } from '../app/shared/utils/credientials';

// @Injectable({
//   providedIn: 'root'
// })
// export class UploadPictureService {

//   constructor(private http: HttpClient) { }

//   completeDataToUpload(file: File): Observable<any> {
//     const data = new FormData();
//     data.append('file', file);
//     data.append('upload_preset', `${UPLOAD_PRESET}`);
//     data.append('cloud_name', `${CLOUD_NAME}`);
//     return this.http.post(`${CALL_TO_CLOUDINARY_API}`, data);
//   }

//   uploadImages(files: File[]): Observable<any[]> {
//     const observables: Observable<any>[] = [];
//     files.forEach(file => {
//       observables.push(this.completeDataToUpload(file));
//     });
//     return forkJoin(observables);
//   }
// }
