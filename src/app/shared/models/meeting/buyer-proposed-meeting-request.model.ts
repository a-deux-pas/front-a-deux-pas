export class BuyerProposedMeetingRequest {
  constructor(
    public buyerId: number,
    public sellerId: number,
    public adId: number,
    public proposedMeetingPlaceId: number,
    public proposedDate: Date,
    public proposedTime: string,
    public buyerAdditionalInfo: string | null,
    public buyerDistinctiveSign: string | null
  ) {}
}
