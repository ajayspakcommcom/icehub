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
  const user = verifyToken(req);

  // if (!user) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // } else {

    if (req.method === 'POST') {

      switch (req.body.type) {
        case 'CREATE':
          try {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
            const user = await User.create({
              email: req.body.email,
              password: hashedPassword,
              profession: req.body.profession,
              experienceYears: req.body.experienceYears,
              bio: req.body.bio,
              phoneNumber: req.body.phoneNumber,
              createdAt: new Date()
            });

            const address = await Address.create({
              location: req.body.location,
              state: req.body.state,
              city: req.body.city,
              user: user._id
            });

            res.status(200).json({ message: 'User Created' });
          } catch (error: any) {

            if (error instanceof Error.ValidationError) {
              return res.status(400).json({ error: `Validation Error`, errorDetail: error.message });
            }

            if (error instanceof Error.CastError) {
              return res.status(400).json({ error: `Cast Error`, errorDetail: error.message });
            }

            if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 11000) {

              const errorMessage = (error as any).errmsg; 

              if (errorMessage.includes('email_1')) {
                return res.status(400).json({ error: 'Duplicate Email', errorDetail: 'The email address is already in use. Please choose a different email.' });
              } 

              // else if (errorMessage.includes('username_1')) {
              //   return res.status(400).json({ error: 'Duplicate Username', errorDetail: 'The username is already in use. Please choose a different username.' });
              // } 

              else if (errorMessage.includes('profession')) {
                return res.status(400).json({ error: 'Not valid professional', errorDetail: 'Please provide valid professional' });
              }
              else {
                res.status(500).json({ error: 'Internal Error', errorDetail: 'An unexpected error occurred' });
              }
            }
          }

          break;
        case 'LIST':
          try {
            const dataList = await User.find({}).exec();
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
  // }





}
