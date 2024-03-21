import { ArticlePicture } from "./article-picture.model";

export class Ad {
    id: number;
    title: string;
    articleDescription: string;
    creationDate: Date;
    price: number;
    category?: string;
    subcategory?: string;
    articleGender?: string;
    publisherId: number;
    articlePictures: ArticlePicture[];
    articleState?: string;

    constructor(
        id: number,
        title: string,
        articleDescription: string,
        creationDate: Date,
        price: number,
        publisherId: number,
        articlePictures: ArticlePicture[],
        category?: string,
        subcategory?: string,
        articleGender?: string,
        articleState?: string,
    ) {
        this.id = id;
        this.title = title;
        this.articleDescription = articleDescription;
        this.creationDate = creationDate;
        this.price = price;
        this.publisherId = publisherId;
        this.articlePictures = articlePictures;
        this.category = category;
        this.subcategory = subcategory;
        this.articleGender = articleGender;
        this.articleState = articleState;
    }
}
