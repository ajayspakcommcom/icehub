// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToMongoDB from './libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Error } from 'mongoose';
import { Error as MongooseError } from 'mongoose';
import { verifyToken } from './libs/verifyToken';
import runMiddleware from './libs/runMiddleware';
import Cors from 'cors';
import { UserTask } from './models/UserTask';

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
              task: req.body.taskId
            };

            switch (req.body.createTaskType) {
              case 'blog':
                taskData = { ...taskData, blogTitle: req.body.blogTitle, blogParagraph: req.body.blogParagraph, selectedBlog: req.body.selectedBlog };
                break;
              case 'case study':
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

            const task = await UserTask.create(taskData);

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
        case 'LIST':
          try {
            const dataList = await UserTask.find({}).exec();
            res.status(200).json({ data: dataList });
          } catch (error: any) {

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
