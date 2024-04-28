export class PreferredMeetingPlace {
  constructor(
    public id: number,
    public country: string,
    public postalCode: string,
    public city: string,
    public street: string,
    public name: string,
    public userId: number
  ) {}
}
