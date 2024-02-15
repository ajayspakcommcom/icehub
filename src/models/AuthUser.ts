export default interface AuthUser {
    _id?: string;
    username?: string;
    password?: string;
    email?: string;
    profession?: string;
    experienceYears?: number;
    bio?: string;
    phoneNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: string;
}
