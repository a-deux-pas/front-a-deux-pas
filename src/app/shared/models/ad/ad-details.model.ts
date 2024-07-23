export class AdDetails {
        constructor(
                public favorite: boolean,
                public id: number,
                public title: string,
                public publisherId: number,
                public articleState: string,
                public articleDescription: string,
                public category: string,
                public subcategory: any,
                public publisherEmail?: string,
                public articlePictures?: string[],
                public price?: number,
                public publisherAlias?: string,
                public publisherInscriptionDate?: string,
                public publisherCity?: string,
                public publisherPostalCode?: string,
                public creationDate?: string,
                public status?: string,
                public articleGender?: string,
        ) { }
}
