import { MeetingCommon } from "./meeting-common.model";

export interface MeetingProposed extends MeetingCommon  {
    idMeeting: number;
    status: string;
    date: string;
    sellerAlias: string;
    buyerAlias: string;
    buyerId:number;
    sellerProfilePictureUrl: string;
    buyerProfilePictureUrl: string;
    sellerInscriptionDate?: string;
    buyerInscriptionDate?: string;
    meetingPlaceName: string;
    postalCode: string;
    city: string;
    street: string;
    adTitle: string;
    adPrice: number;
    adPictureUrl: string;
    buyerAdditionalInfo?: string;
    sellerAdditionalInfo?: string;
    buyerDistinctiveSign?: string;
    sellerDistinctiveSign?: string;
}