// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToMongoDB from './libs/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Error } from 'mongoose';
import { Error as MongooseError } from 'mongoose';
import { verifyToken } from './libs/verifyToken';
import runMiddleware from './libs/runMiddleware';
import Cors from 'cors';
import { TaskType } from './models/TaskType';


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

            const taskType = await TaskType.create({ name: req.body.name });

            res.status(201).json({ message: 'Task Type have been successfully created.' });
          } catch (error: any) {

            if (error instanceof Error.ValidationError) {
              return res.status(400).json({ error: `Validation Error`, errorDetail: error.message });
            }

            if (error instanceof Error.CastError) {
              return res.status(400).json({ error: `Cast Error`, errorDetail: error.message });
            }

            if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 11000) {

              const errorMessage = (error as any).errmsg;

              if (errorMessage.includes('name_1')) {
                return res.status(400).json({ error: 'Duplicate Name', errorDetail: 'The Task type name is already in use. Please choose a different name.' });
              }
              else {
                res.status(500).json({ error: 'Internal Error', errorDetail: error });
              }
            }
          }

          break;
        case 'LIST':
          try {
            const dataList = await TaskType.find({}).exec();
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
