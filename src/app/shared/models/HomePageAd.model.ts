export class HomePageAd {
  constructor(
    public title: string,
    public articlePictureUrl: string,
    public price: number,
    public articleState: string,
    public category: string,
    public subcategory: string,
    public articleGender: string,
    public creationDate: Date,
    public publisher: string,
    public publisherCity: string,
    public publisherPostalCode: string
  ) {}
}
