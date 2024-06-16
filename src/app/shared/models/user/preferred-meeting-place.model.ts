export class PreferredMeetingPlace {
  constructor(
    public postalCode: string,
    public city: string,
    public street: string,
    public name: string,
    public userId: number | string,
    public id?: number,
  ) {}
}
