export class AdDetails {
    constructor(
        public id?: number,
        public title?: string,
        public articlePictures?: string[] | null,
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
        public subcategory?: any,
        public articleGender?: string,
    ) { }
}
// TO DO :: voir ce qui doit rester optionnel (tous sauf title, price, publisherId, articleState, articleDescription, category, subcategory)
