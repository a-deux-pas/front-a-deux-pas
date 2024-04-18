export class AdResponse {
    constructor(
        public id?: number,
        public title?: string,
        public firstArticlePictureUrl?: string,
        public secondArticlePictureUrl?: string,
        public thirdArticlePictureUrl?: string,
        public fourthArticlePictureUrl?: string,
        public fifthArticlePictureUrl?: string,
        public price?: number,
        public publisher?: string,
        public publisherCity?: string,
        public publisherPostalCode?: string,
        public creationDate?: Date,
        public articleState?: string,
        public articleDescription?: string,
        public status?: string
    ) { }
}