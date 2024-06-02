export class PreferredSchedule {
  constructor(
    public id: number,
    public daysOfWeek: number[] | number,
    public startTime: string,
    public endTime: string,
    public userId: number
  ) {}
}
