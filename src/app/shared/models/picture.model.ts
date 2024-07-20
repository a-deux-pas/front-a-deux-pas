export class Picture {
    constructor(
        public file?: File | null,
        public userId?: number | string,
        public adId?: number | string,
        public id?: number,
        public publicId?: string,
        public url?: string
    ) { }
}

// TO DO :: plus sur d'en avoir besoin