import { PreferredMeetingPlace } from './preferred-meeting-place.model';
import { PreferredSchedule } from './preferred-schedule.model';

export class Seller {
  constructor(
    public id: string,
    public bankAccountHolder: string,
    public bankAccountNumber: string,
    public preferredSchedules: PreferredSchedule[],
    public preferredMeetingPlaces: PreferredMeetingPlace[]
  ) {}
}
