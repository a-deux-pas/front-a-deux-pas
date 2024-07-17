import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Image } from '../models/ad/image.model';
import { API_URL } from '../utils/constants/utils-constants';
import { HandleErrorService } from './handle-error.service';
// TO DO :: prendra la place du upload picture service
// TODO :: ajouter handle Error
@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private contextUrl = `${API_URL}cloudinary/`;

    constructor(private http: HttpClient, private handleErrorService: HandleErrorService) { }

    public list(): Observable<Image[]> {
        return this.http.get<Image[]>(this.contextUrl + 'list');
    }

    public upload(image: FormData, type: String): Observable<any> {
        const url = `${this.contextUrl}upload/${type}`
        return this.http.post<FormData>(url, image).pipe(
            catchError(this.handleErrorService.handleError)
        );
    }

    public delete(id: any): Observable<any> {
        return this.http.delete<any>(this.contextUrl + `delete/${id}`);
    }

} 