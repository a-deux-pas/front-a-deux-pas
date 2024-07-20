import { MeetingCommon } from "./meeting-common.model";

export interface MeetingToConfirm extends MeetingCommon {
    idMeeting: number;
    status: string;
    date: string;
    buyerAlias: string;
    buyerId:number;
    buyerProfilePictureUrl: string;
    inscriptionDate: string;
    meetingPlaceName: string;
    postalCode: string;
    city: string;
    street: string;
    adTitle: string;
    adPrice: number;
    adPictureUrl: string;
    buyerDistinctiveSign?: string;
    sellerAdditionalInfo?: string;
    sellerDistinctiveSign?: string;
}