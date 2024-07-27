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
        clickable: true,
        maxFiles: 1,
        resizeWidth: 230,
        resizeHeight: 230
    };

    getConfig(width?: number, height?: number): DropzoneConfigInterface {
        return {
            ...this.config,
            thumbnailWidth: width || this.config.thumbnailWidth,
            thumbnailHeight: height || this.config.thumbnailHeight,
            resizeWidth: width,
            resizeHeight: height


        }
    }

    setThumbnailDimensions(width: number, height: number): void {
        this.config.thumbnailWidth = width;
        this.config.thumbnailHeight = height;
    }
}
