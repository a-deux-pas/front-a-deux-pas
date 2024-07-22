export class UserPresentation {
  constructor(
    public id: number,
    public alias: string,
    public city: string,
    public postalCode?: string,
    public bio?: string,
    public inscriptionDate?: Date,
    public profilePicture?:string,
    public salesNumber?: string,
  ) {}
}
