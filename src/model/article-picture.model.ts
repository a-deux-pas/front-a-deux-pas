import { Ad } from "./ad.model";

export class ArticlePicture {
    url: string;
    ad?: Ad;
    id?: number;

    constructor(url: string, ad?: Ad, id?: number) {
        this.url = url;
        this.ad = ad;
        this.id = id;
    }
}
