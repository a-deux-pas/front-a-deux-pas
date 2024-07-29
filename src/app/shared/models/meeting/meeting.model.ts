export interface Meeting {
  idMeeting: number;
  status: string;
  date: string;
  buyerId: number;
  sellerId: number;
  buyerAlias: string;
  sellerAlias: string;
  buyerInscriptionDate?: string;
  sellerInscriptionDate?: string;
  buyerCity?: string;
  sellerCity?: string;
  buyerAdditionalInfo?: string;
  sellerAdditionalInfo?: string;
  buyerDistinctiveSign?: string;
  sellerDistinctiveSign?: string;
  buyerProfilePictureUrl: string;
  sellerProfilePictureUrl: string;
  meetingPlaceName: string;
  postalCode: string;
  city: string;
  street: string;
  adId: number;
  adPublisherAlias: string;
  adTitle: string;
  adPrice: number;
  adPictureUrl: string;
}
