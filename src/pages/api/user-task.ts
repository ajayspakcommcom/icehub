// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToMongoDB from './libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Error } from 'mongoose';
import { Error as MongooseError } from 'mongoose';
import { verifyToken } from './libs/verifyToken';
import runMiddleware from './libs/runMiddleware';
import Cors from 'cors';
import { UserTask } from './models/UserTask';
import { Task } from './models/Task';
import { fetchTaskTypeId } from './libs/utils';

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

            if (!req.body.createTaskType) {
              return res.status(400).json({ error: 'Missing createTaskType in request body' });
            }

            //post man body for blog task 
            // const postBodyObj = {
            //   "type": "CREATE",
            //   "createTaskType": "blog",
            //   "userId": "65d72edd5be9ee937cf60630",
            //   "taskId": "65d735cf8abbb6154ff8aff4",
            //   "blogTitle": "Blog Title",
            //   "blogParagraph": "Blog Content",
            //   "selectedBlog": "black-theme",
            //   "createdBy": "65d5c37aeba6623d9fad0211"
            // }

            let taskData: any = {
              user: req.body.userId,
              task: req.body.taskId,
              submitted: true
            };

            switch (req.body.createTaskType) {
              case 'blog':
                taskData = { ...taskData, blogTitle: req.body.blogTitle, blogParagraph: req.body.blogParagraph, selectedBlog: req.body.selectedBlog };
                break;
              case 'case-study':
                taskData = { ...taskData, caseStudyTitle: req.body.caseStudyTitle, csDiagnosis: req.body.csDiagnosis, csTreatment: req.body.csTreatment, csQuestion1: req.body.csQuestion1, csQuestion2: req.body.csQuestion2, csDoctorName: req.body.csDoctorName };
                break;
              case 'infographic':
                taskData = { ...taskData, infographicTitle: req.body.infographicTitle, infographic1: req.body.infographic1, infographic2: req.body.infographic2, infographic3: req.body.infographic3, infographic4: req.body.infographic4, infographic5: req.body.infographic5, infographic6: req.body.infographic6, selectedInfographic: req.body.selectedInfographic };
                break;
              case 'video':
                taskData = { ...taskData, videoTitle: req.body.videoTitle, videoUrl: req.body.videoUrl };
                break;
              default:
                return res.status(400).json({ error: 'Invalid createTaskType' });
            }

            const userTask = await UserTask.create(taskData);

            if (userTask) {
              await Task.findOneAndUpdate(
                {
                  _id: req.body.taskId,
                  'assignedTo.user': req.body.userId
                },
                {
                  $set: {
                    'assignedTo.$.isSubmitted': true,
                    'assignedTo.$.createdDate': new Date()
                  }
                },
                { new: true }
              );
            }

            res.status(201).json({ message: 'User Task have been successfully created.' });
          }
          catch (error: any) {

            if (error instanceof Error.ValidationError) {
              return res.status(400).json({ error: `Validation Error`, errorDetail: error.message });
            }

            if (error instanceof Error.CastError) {
              return res.status(400).json({ error: `Cast Error`, errorDetail: error.message });
            }

            return res.status(500).json({ error: 'Internal Server Error' });

          }

          break;
        case 'SUBMITTED-USER-TASK':
          try {

            // const dataList = await UserTask.find({ user: req.body.userId, submitted: true, approvedByAdmin: false }).exec();
            // console.log('dataList', dataList);

            const userTaskList = await UserTask.find({ user: req.body.userId, submitted: true }).populate('task', 'taskType').exec();
            const dataList = userTaskList.map(userTask => ({
              ...userTask.toObject(), // Convert Mongoose document to plain JavaScript object
              taskType: userTask.task ? userTask.task.taskType : null // Get taskType if task exists, otherwise set to null
            }));

            res.status(200).json({ data: dataList });
          }
          catch (error: any) {

            if (error instanceof MongooseError) {
              return res.status(500).json({ error: 'Database Error', errorDetail: error });
            }
            res.status(500).json({ error: 'Internal Server Error' });
          }
          break;

        case 'APPROVED-USER-TASK':
          try {

            // const dataList = await UserTask.find({ user: req.body.userId, submitted: true, approvedByAdmin: true }).exec();
            // console.log('dataList', dataList);

            const userTaskList = await UserTask.find({ user: req.body.userId, submitted: true, approvedByAdmin: true }).populate('task', 'taskType').exec();
            const dataList = userTaskList.map(userTask => ({
              ...userTask.toObject(), // Convert Mongoose document to plain JavaScript object
              taskType: userTask.task ? userTask.task.taskType : null // Get taskType if task exists, otherwise set to null
            }));

            res.status(200).json({ data: dataList });
          }
          catch (error: any) {

            if (error instanceof MongooseError) {
              return res.status(500).json({ error: 'Database Error', errorDetail: error });
            }
            res.status(500).json({ error: 'Internal Server Error' });
          }
          break;

        case 'DETAIL-USER-TASK':
          try {

            const dataList = await UserTask.findOne({ _id: req.body.taskId, user: req.body.userId }).exec();
            console.log('dataList', dataList);

            res.status(200).json({ data: dataList });
          }
          catch (error: any) {

            if (error instanceof MongooseError) {
              return res.status(500).json({ error: 'Database Error', errorDetail: error });
            }
            res.status(500).json({ error: 'Internal Server Error' });
          }
          break;

        case 'LIKES-DISLIKES':
          try {

            // {
            //   "type": "LIKES-DISLIKES"
            //   "userTaskId": "65e16b52e0cb38144c31843b"
            //   "userId": "65d72edd5be9ee937cf60630"
            // }

            const userTask = await UserTask.findById(req.body.userTaskId);

            if (!userTask) {
              return res.status(404).json({ message: 'UserTask not found' });
            }

            // if (userTask.likes.includes(req.body.userId)) {
            //   return res.status(400).json({ message: 'User has already liked this UserTask' });
            // }

            // userTask.likes.push(req.body.userId);

            // await userTask.save();

            //return res.status(200).json({ message: 'UserTask liked successfully' });

            const userIndex = userTask.likes.indexOf(req.body.userId);

            if (userIndex !== -1) {
              userTask.likes.splice(userIndex, 1);
              const updatedData = await userTask.save();
              return res.status(200).json({ message: 'UserTask unliked successfully', data: updatedData });
            } else {
              // Add the user's ID to the likes array
              userTask.likes.push(req.body.userId);
              const updatedData = await userTask.save();
              return res.status(200).json({ message: 'UserTask liked successfully', data: updatedData });
            }

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
