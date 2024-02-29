interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dob: Date | null;
    city: string;
    hospitalName: string;
    aboutYourSelf: string | null;
    imageUrl: string | null;
    specialization: string;
    designation: string;
    createdBy: string | null;
    updatedBy: string | null;
    updatedDate: Date | null;
    deletedBy: string | null;
    deletedDate: Date | null;
    createdDate: Date;
    __v: number;
}

interface AssignedTo {
    user: string;
    isSubmitted: boolean;
    createdDate: Date;
    _id: string;
}

interface Task {
    _id: string;
    name: string;
    taskType: string;
    dueDate: Date;
    assignedTo: AssignedTo[];
    createdBy: string;
    updatedBy: string | null;
    updatedDate: Date | null;
    deletedBy: string | null;
    deletedDate: Date | null;
    createdDate: Date;
    __v: number;
}

export interface FeedTask {
    _id: string;
    user: User;
    task: Task;
    blogTitle: string | null;
    blogParagraph: string | null;
    caseStudyTitle: string | null;
    csDiagnosis: string | null;
    csTreatment: string | null;
    csQuestion1: string | null;
    csQuestion2: string | null;
    csDoctorName: string | null;
    videoTitle: string;
    videoUrl: string;
    infographicTitle: string | null;
    infographic1: string | null;
    infographic2: string | null;
    infographic3: string | null;
    infographic4: string | null;
    infographic5: string | null;
    infographic6: string | null;
    selectedBlog: string | null;
    selectedInfographic: string | null;
    submitted: boolean;
    completionDate: Date | null;
    likes: any[];
    createdBy: string | null;
    updatedBy: string | null;
    updatedDate: Date | null;
    deletedBy: string | null;
    deletedDate: Date | null;
    approvedByAdmin: boolean;
    rejectionReason: string | null;
    createdDate: Date;
    __v: number;
}
