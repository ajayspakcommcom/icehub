import { Task } from "../models/Task";

const fetchTaskTypeId = async (userTaskIdList: string[]): Promise<string[]> => {
    try {
        const taskTypeList: string[] = [];

        // Loop through userTaskIdList
        for (const taskId of userTaskIdList) {
            // Find task by taskId
            const task = await Task.findById(taskId);

            // If task is found, push its taskType to taskTypeList
            if (task) {
                taskTypeList.push(task.taskType);
            }
        }

        return taskTypeList;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching task types:', error);
        throw new Error('Error fetching task types');
    }
};

export { fetchTaskTypeId };