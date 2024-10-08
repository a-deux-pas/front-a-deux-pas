export class MeetingRequest {
  constructor(
    public buyerId?: number,
    public sellerId?: number,
    public adId?: number,
    public proposedMeetingPlaceId?: number,
    public date?: string,
    public buyerAdditionalInfo?: string | null,
    public buyerDistinctiveSign?: string | null,
    public meetingId?: number
  ) {}
}
