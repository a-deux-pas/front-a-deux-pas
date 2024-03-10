export class PreferredSchedule {
  constructor(
    public id: string,
    public startTime: string,
    public endTime: string,
    public weekday: string,
    public userId: number
  ) {}
}
