export class PreferredMeetingPlace {
  constructor(
    public id: number,
    public postalCode: string,
    public city: string,
    public street: string,
    public name: string,
    public userId: number
  ) {}
}
