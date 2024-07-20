import { MeetingCommon } from "./meeting-common.model";

export interface MeetingPlanned extends MeetingCommon {
    idMeeting: number;
    date: string;
    status: string;
    buyerAlias: string;
    sellerAlias: string;
    buyerId:number;
    buyerProfilePictureUrl: string;
    sellerProfilePictureUrl: string;
    buyerInscriptionDate: string;
    sellerInscriptionDate: string;
    meetingPlaceName: string;
    postalCode: string;
    city: string;
    street: string;
    buyerDistinctiveSign: string;
    sellerDistinctiveSign: string;
    adTitle: string;
    adPrice: number;
    adPictureUrl: string;
}