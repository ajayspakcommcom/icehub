// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToMongoDB from './libs/mongodb';
import { User } from './models/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { Error } from 'mongoose';
import { Error as MongooseError } from 'mongoose';
import { verifyToken } from './libs/verifyToken';
import runMiddleware from './libs/runMiddleware';
import Cors from 'cors';
import { Address } from './models/Address';

interface UserType {
  username: string;
  email: string;
  password: string;
  profession: string;
  experienceYears: number;
  bio: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface ApiResponse {
  message?: string;
  error?: string;
  errorDetail?: any;
  data?: any;
}

const cors = Cors({
  // Only allow requests with GET, POST and OPTIONS
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

  await connectToMongoDB();
  await runMiddleware(req, res, cors);
  
  try {
    const dataList = await User.find({}).exec();
    res.status(200).json({ data: dataList });
  } catch (error: any) {

    if (error instanceof MongooseError) {
      return res.status(500).json({ error: 'Database Error', errorDetail: error });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }


}
