import { EventNotification } from "./event-notification.model";
import { PreferredMeetingPlace } from "./preferred-meeting-place.model";
import { PreferredSchedule } from "./preferred-schedule.model";

export class UserProfile {
  constructor(
    public id: string,
    public profilePicture: FormData,
    public alias: string,
    public bio: string | null,
    public city: string,
    public street: string,
    public postalCode: string,
    public bankAccountHolder: string,
    public bankAccountNumber: string,
    public preferredSchedules: PreferredSchedule[],
    public preferredMeetingPlaces: PreferredMeetingPlace[],
    public notifications?: EventNotification[],
  ) { }
}
