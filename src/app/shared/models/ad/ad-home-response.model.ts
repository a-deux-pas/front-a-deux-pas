export class AdHomeResponse {
  constructor(
    public id: number,
    public title: string,
    public firstArticlePictureUrl: string,
    public price: number,
    public publisherId: number,
    public publisherAlias: string,
    public publisherCity: string,
    public publisherPostalCode: string
  ) { }
}
