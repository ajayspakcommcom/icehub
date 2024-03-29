// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToMongoDB from './libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import { Error } from 'mongoose';
import { Error as MongooseError } from 'mongoose';
import { verifyToken } from './libs/verifyToken';
import runMiddleware from './libs/runMiddleware';
import Cors from 'cors';
import { Task } from './models/Task';
import { getTaskTypeId, getTaskTypeName } from './service/common';

interface ApiResponse {
  message?: string;
  error?: string;
  errorDetail?: any;
  data?: any;
}

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

  await connectToMongoDB();
  await runMiddleware(req, res, cors);
  const user = verifyToken(req);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {

    if (req.method === 'POST') {

      switch (req.body.type) {
        case 'CREATE':
          try {

            // post man json
            // const postmanObj = {
            //   "type": "CREATE",
            //   "name": "Create Blog 1",
            //   "taskType": "65d5d6a17b554092c5e3c22b",
            //   "dueDate": "2024-02-25T00:00:00.000Z",
            //   "assignedTo": [
            //             { "user": "65d5b4efeba6623d9fad01a1", "isSubmitted": true },
            //             { "user": "65d5b9a3eba6623d9fad01c4", "isSubmitted": false }
            //           ],
            //   "createdBy": "65d5c37aeba6623d9fad0211"
            // }

            const taskTypeName = await getTaskTypeId(req.body.taskTypeName)

            const assignedToData = Array.isArray(req.body.assignedTo) && req.body.assignedTo.length > 0
              ? req.body.assignedTo.map((item: { user: string, isSubmitted: boolean, createdDate: Date }) => ({
                user: new mongoose.Types.ObjectId(item.user),
                isSubmitted: item.isSubmitted,
                createdDate: item.createdDate
              })) : [];

            const task = await Task.create({
              name: req.body.name,
              taskType: taskTypeName,
              dueDate: req.body.dueDate,
              assignedTo: assignedToData,
              // assignedTo: req.body.assignedTo.map((item: { user: string, isSubmitted: boolean, createdDate: Date }) => ({
              //   user: new mongoose.Types.ObjectId(item.user),
              //   isSubmitted: item.isSubmitted,
              //   createdDate: item.createdDate
              // })),
              createdBy: req.body.createdBy
            });

            res.status(201).json({ message: 'Task have been successfully created.' });
          }
          catch (error: any) {

            if (error instanceof Error.ValidationError) {
              return res.status(400).json({ error: `Validation Error`, errorDetail: error.message });
            }

            if (error instanceof Error.CastError) {
              return res.status(400).json({ error: `Cast Error`, errorDetail: error.message });
            }
          }

          break;


        case 'UPDATE-TASK':
          try {
            const { taskId, name, taskTypeName, dueDate, assignedTo, updatedBy } = req.body;

            console.log('req.body', req.body);

            const taskTypeId = await getTaskTypeId(taskTypeName)

            const assignedToData = Array.isArray(assignedTo) && assignedTo.length > 0
              ? assignedTo.map((item: { user: string, isSubmitted: boolean, createdDate: Date }) => ({
                user: new mongoose.Types.ObjectId(item.user),
                isSubmitted: item.isSubmitted,
                createdDate: item.createdDate
              })) : [];

            const updatedTask = await Task.findByIdAndUpdate(taskId, {
              name: name,
              taskType: taskTypeId,
              dueDate: dueDate,
              assignedTo: assignedToData,
              updatedBy: updatedBy,
              updatedDate: new Date()
            });


            if (!updatedTask) {
              return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json({ message: 'Task updated successfully' });
          } catch (error: any) {

            if (error instanceof Error.ValidationError) {
              return res.status(400).json({ error: `Validation Error`, errorDetail: error.message });
            }

            if (error instanceof Error.CastError) {
              return res.status(400).json({ error: `Cast Error`, errorDetail: error.message });
            }

            console.error('Error updating task:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
          break;

        case 'ASSIGN-ADMIN-TASK':
          try {
            const { taskId, assignedTo, updatedBy } = req.body;

            console.log('body', req.body);


            // Check if all required fields are present
            if (!taskId || !assignedTo || !updatedBy) {
              return res.status(400).json({ message: 'taskId, assignedToData, and updatedBy are required fields' });
            }

            const assignedToDataList = Array.isArray(assignedTo) && assignedTo.length > 0
              ? assignedTo.map((item: { user: string, isSubmitted: boolean, createdDate: Date }) => ({
                user: new mongoose.Types.ObjectId(item.user),
                isSubmitted: item.isSubmitted,
                createdDate: item.createdDate
              })) : [];

            // Update the task
            const updatedTask = await Task.findByIdAndUpdate(taskId, {
              assignedTo: assignedToDataList,
              updatedBy: updatedBy,
              updatedDate: new Date()
            });

            if (!updatedTask) {
              return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json({ message: 'Task Assigned Successfully' });
          } catch (error: any) {
            if (error instanceof Error.ValidationError) {
              return res.status(400).json({ error: `Validation Error`, errorDetail: error.message });
            }

            if (error instanceof Error.CastError) {
              return res.status(400).json({ error: `Cast Error`, errorDetail: error.message });
            }

            console.error('Error updating task:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }

          break;

        case 'DELETE-TASK':
          try {
            const { taskId } = req.body;

            console.log('req.body', req.body);


            if (!taskId) {
              return res.status(400).json({ message: 'TaskId is required' });
            }

            const deletedTask = await Task.findByIdAndDelete(taskId);

            if (!deletedTask) {
              return res.status(404).json({ message: 'Task not found' });
            } else {
              res.status(200).json({ message: 'Task deleted successfully' });
            }
          } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
          break;

        case 'ASSIGEND-TASK-LIST':
          try {
            const dataList = await Task.find({ 'assignedTo.user': req.body.userId }).exec();
            res.status(200).json({ data: dataList });
          }
          catch (error: any) {

            if (error instanceof MongooseError) {
              return res.status(500).json({ error: 'Database Error', errorDetail: error });
            }
            res.status(500).json({ error: 'Internal Server Error' });
          }
          break;

        case 'ADMIN-TASK-LIST':
          try {

            const dataList = await Task.find({}).lean().exec();
            const finalOutput = [];

            for (const task of dataList) {
              const taskTypeName = await getTaskTypeName(task.taskType);
              task.taskTypeName = taskTypeName;
              finalOutput.push(task);
            }

            res.status(200).json({ data: finalOutput });
          }
          catch (error: any) {

            if (error instanceof MongooseError) {
              return res.status(500).json({ error: 'Database Error', errorDetail: error });
            }
            res.status(500).json({ error: 'Internal Server Error' });
          }
          break;

      }

    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }

}
