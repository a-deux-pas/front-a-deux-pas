import { Ad } from "./ad.model";

export class ArticlePicture {

    constructor(
        public url: string,
        public ad?: Ad,
        public id?: number) { }
}
