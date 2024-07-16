import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/ad/image.model';
import { API_URL } from '../utils/constants/utils-constants';
// TO DO :: prendra la place du upload picture service
@Injectable({
    providedIn: 'root'
})
export class ImageService {

    imageURL = `${API_URL}cloudinary/`;

    constructor(private httpClient: HttpClient) { }

    public list(): Observable<Image[]> {
        return this.httpClient.get<Image[]>(this.imageURL + 'list');
    }

    public upload(image: File): Observable<any> {
        const formData = new FormData();
        formData.append('multipartFile', image);

        // Vérification du contenu de FormData
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        return this.httpClient.post<any>(this.imageURL + 'upload', formData);
    }

    public delete(id: any): Observable<any> {
        return this.httpClient.delete<any>(this.imageURL + `delete/${id}`);
    }

} 