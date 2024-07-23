export class BuyerProposedMeetingRequest {
  constructor(
    public buyerId: number,
    public sellerId: number,
    public adId: number,
    public proposedMeetingPlaceId: number,
    public date: String,
    public buyerAdditionalInfo: string | null,
    public buyerDistinctiveSign: string | null
  ) {}
}
