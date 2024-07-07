export class AdCard {
  constructor(
    public id: number,
    public title: string,
    public firstArticlePictureUrl: string,
    public price: number,
    public publisherId: number,
    public publisherAlias: string,
    public favorite: boolean,
    public status: string
  ) { }
}
