export class User {
  constructor(
    public id: number,
    public alias: string,
    public bio: string,
    public country: string,
    public city: string,
    public street: string,
    public postalCode: string,
    public inscriptionDate: Date,
    public profilePicture?:string,
    public email?:string,
    public password?:string,
    public accountStatus?:string,
  ) {}
}
