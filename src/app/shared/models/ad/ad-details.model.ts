import { ArticlePicture } from "./article-picture.model";

export class AdDetails {
  constructor(
    public id: number,
    public title: string,
    public category: string,
    public subcategory: any,
    public articleDescription: string,
    public articleState: string,
    public price: number,
    public publisherId: number,
    public articlePictures?: ArticlePicture[],
    public firstArticlePictureUrl?: string,
    public secondArticlePictureUrl?: string,
    public thirdArticlePictureUrl?: string,
    public fourthArticlePictureUrl?: string,
    public fifthArticlePictureUrl?: string,
    public articleGender?: string,
    public status?: string,
    public creationDate?: string,
    public publisherAlias?: string,
    public publisherInscriptionDate?: string,
    public publisherCity?: string,
    public publisherPostalCode?: string,
    public favorite?: boolean,
  ) { }
}
