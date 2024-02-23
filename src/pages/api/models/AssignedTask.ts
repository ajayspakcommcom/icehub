
export interface AssinedTask {
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
    userCreatedTask: { createdDate: Date, isSubmitted: boolean, user: string };
    __v: number;
}

interface AssignedTo {
    user: string;
    isSubmitted: boolean;
    _id: string;
}