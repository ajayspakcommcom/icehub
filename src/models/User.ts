// // models/User.ts

// interface Address {
//     street: string;
//     city: string;
//     state: string;
//     postalCode: string;
//     country: string;
// }

// interface ContactInfo {
//     email: string;
//     phone: string;
// }

// enum EmployeeType {
//     FullTime = 'Full-Time',
//     PartTime = 'Part-Time',
//     Contract = 'Contract',
// }

// interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     username: string;
//     email: string;
//     jobTitle: string;
//     department: string;
//     address: Address;
//     contactInfo: ContactInfo;
//     employeeType: EmployeeType;
//     hireDate: Date;
//     isManager: boolean;
//     managerId?: number | null;
// }

// export default User;


export default interface User {
    email?: string;
    password: string;
    profession?: string;
    experienceYears?: number;
    bio?: string;
    phoneNumber?: string;
    location?: string;
    state?: string;
    city?: string;
    type?: string; 
}