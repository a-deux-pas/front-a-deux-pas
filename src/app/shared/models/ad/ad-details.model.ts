import { ArticlePicture } from "./article-picture.model";

export class AdDetails {
    constructor(
        public id?: number,
        public title?: string,
        public articlePictures?: ArticlePicture[],
        public firstArticlePictureUrl?: string,
        public secondArticlePictureUrl?: string,
        public thirdArticlePictureUrl?: string,
        public fourthArticlePictureUrl?: string,
        public fifthArticlePictureUrl?: string,
        public price?: number,
        public publisherId?: number,
        public publisherAlias?: string,
        public publisherInscriptionDate?: string,
        public publisherCity?: string,
        public publisherPostalCode?: string,
        public creationDate?: string,
        public articleState?: string,
        public articleDescription?: string,
        public status?: string,
        public category?: string,
        public adStatus?: string,
        public subcategory?: any,
        public articleGender?: string,
    ) { }
}
