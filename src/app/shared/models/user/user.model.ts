export class User {
  constructor(
    public id: number,
    public alias: string,
    public inscriptionDate: Date,
    public bio: string,
    public city: string,
    public street?: string,
    public postalCode?: string,
    public country?: string,
    public profilePicture?:string,
    public email?:string,
    public password?:string,
    public accountStatus?:string,
  ) {}
}
