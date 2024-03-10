export class PreferredSchedule {
  constructor(
    public id: number,
    public weekday: string,
    public startTime: string,
    public endTime: string,
    public userId: number
  ) {}
}
