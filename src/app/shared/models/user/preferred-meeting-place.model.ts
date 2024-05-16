export class PreferredMeetingPlace {
  constructor(
    public postalCode: string,
    public city: string,
    public street: string,
    public name: string,
    public id?: number,
    public userId?: number
  ) {}
}
