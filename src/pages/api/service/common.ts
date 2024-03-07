import mongoose from 'mongoose';
import { TaskType } from '../models/TaskType';

// Assuming you have defined your Task and TaskType models with Mongoose

export async function getTaskTypeName(taskTypeId: mongoose.Types.ObjectId): Promise<string | null> {
    try {
        const taskType = await TaskType.findById(taskTypeId);
        return taskType ? taskType.name : null;
    } catch (error) {
        console.error('Error while fetching task type name:', error);
        return null;
    }
}


