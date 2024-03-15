
export default interface BannerCarouselImage {
    _id?: string;
    heading?: string;
    imgUrl?: string;
    imgLink?: string;
    createdBy?: string | null;
    updatedBy?: string | null;
    updatedDate?: string | null;
    deletedBy?: string | null;
    deletedDate?: string | null;
    createdDate: string;
    __v: number;
}