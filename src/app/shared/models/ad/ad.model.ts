import { ArticlePicture } from "./article-picture.model";

export class Ad {
    constructor(
        public id: number,
        public title: string,
        public articleDescription: string,
        public creationDate?: string,
        public articleState?: string,
        public price?: number,
        public adStatus?: string,
        public category?: string,
        public subcategory?: any,
        public articleGender?: string,
        public publisherId?: number,
        public articlePictures?: ArticlePicture[],
    ) { }
}