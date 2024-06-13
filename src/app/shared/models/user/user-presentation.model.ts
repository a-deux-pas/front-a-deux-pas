export class UserPresentation {
  constructor(
    public id: number,
    public alias: string,
    public bio: string,
    public city: string,
    public inscriptionDate: Date,
    public profilePicture?:string,
  ) {}
}
