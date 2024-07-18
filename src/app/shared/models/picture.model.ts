export class Picture {
    constructor(
        public file: FormData,
        public userId: number | string,
        public id?: number,
        public publicId?: string
    ) { }
}