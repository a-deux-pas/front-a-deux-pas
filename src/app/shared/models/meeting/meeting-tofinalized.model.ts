import { MeetingCommon } from "./meeting-common.model";

export interface ToFinalizedMeeting extends MeetingCommon{
    status: string
    date: string;
    userAlias: string;
    buyerId:number;
    userProfilePictureUrl: string;
    inscriptionDate: string;
    meetingPlaceName: string;
    postalCode: string;
    city: string;
    street: string;
    adTitle: string;
    adPrice: number;
    adPictureUrl: string;
}