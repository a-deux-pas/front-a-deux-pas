import { Ad } from "./ad.model";
import { AccountStatus } from "../app/shared/models/enum/account-status.enum";
import { UserRole } from "../app/shared/models/enum/user-role.enum";

export class User {
    id: number;
    email: string;
    password: string;
    alias: string;
    bio: string;
    country: string;
    city: string;
    street: string;
    postalCode: string;
    profilePicture: string;
    inscriptionDate: Date;
    accountStatus: AccountStatus;
    role: UserRole;
    ads: Ad[];

    constructor(
        id: number,
        email: string,
        password: string,
        alias: string,
        bio: string,
        country: string,
        city: string,
        street: string,
        postalCode: string,
        profilePicture: string,
        inscriptionDate: Date,
        accountStatus: AccountStatus,
        role: UserRole,
        ads: Ad[]
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.alias = alias;
        this.bio = bio;
        this.country = country;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
        this.profilePicture = profilePicture;
        this.inscriptionDate = inscriptionDate;
        this.accountStatus = accountStatus;
        this.role = role;
        this.ads = ads;
    }
}
