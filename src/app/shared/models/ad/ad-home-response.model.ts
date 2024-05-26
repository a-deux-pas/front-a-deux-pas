export class AdHomeResponse {
  constructor(
    public title: string,
    public articlePictureUrl: string,
    public price: number,
    public publisher: string,
    public publisherCity: string,
    public publisherPostalCode: string
  ) {}
}
