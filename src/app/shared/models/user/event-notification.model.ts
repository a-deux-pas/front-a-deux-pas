export class EventNotification {
  constructor(
    public userId: string | null,
    public eventName?: string,
  ) {}
}
