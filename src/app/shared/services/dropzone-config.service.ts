import { Injectable } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Injectable({
    providedIn: 'root'
})
export class DropzoneConfigService {
    private config: DropzoneConfigInterface = {
        url: '/',
        acceptedFiles: 'image/*',
        uploadMultiple: false,
        createImageThumbnails: true,
        resizeMethod: 'contain',
        thumbnailWidth: 230,  // Default value used in profile picture component, can be changed
        thumbnailHeight: 230, // Default value used in profile picture component, can be changed
        addRemoveLinks: true,
        dictRemoveFile: '×',
        dictCancelUpload: '',
        clickable: true,
        maxFiles: 1
    };

    getConfig(): DropzoneConfigInterface {
        return this.config;
    }

    setThumbnailDimensions(width: number, height: number): void {
        this.config.thumbnailWidth = width;
        this.config.thumbnailHeight = height;
    }
}
