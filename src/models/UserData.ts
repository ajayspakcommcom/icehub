export default interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dob: string | null;
    city: string;
    hospitalName: string;
    aboutYourSelf: string | null;
    imageUrl: string | null;
    specialization: string;
    designation: string;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;
    createdDate: string;
    __v: number;
}