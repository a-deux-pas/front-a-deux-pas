import { PreferredMeetingPlace } from './preferred-meeting-place.model';
import { PreferredSchedule } from './preferred-schedule.model';

export interface Seller {
  id: string;
  bankAccountHolder: string;
  bankAccountNumber: string;
  preferredSchedules: PreferredSchedule[];
  preferredMeetingPlaces: PreferredMeetingPlace[];
}
