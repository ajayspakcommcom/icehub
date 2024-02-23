
export interface SubmittedTask {
    _id: string;
    user: string;
    task: string;
    blogTitle: string | null;
    blogParagraph: string | null;
    caseStudyTitle: string | null;
    csDiagnosis: string | null;
    csTreatment: string | null;
    csQuestion1: string | null;
    csQuestion2: string | null;
    csDoctorName: string | null;
    videoTitle: string | null;
    videoUrl: string | null;
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
    completionDate: string | null;
    likes: any[]; // You may want to replace 'any' with a specific type if possible
    createdBy: string | null;
    updatedBy: string | null;
    updatedDate: string | null;
    deletedBy: string | null;
    deletedDate: string | null;
    approvedByAdmin: boolean;
    rejectionReason: string | null;
    createdDate: string;
    __v: number;
}

