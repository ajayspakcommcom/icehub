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
import { Product } from './models/Product';

interface ProductType {
  name:string;
  description: string;
  price: number;
  category: string;
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

            const product = await Product.create({
              name: req.body.name,
              description:req.body.description,
              price: req.body.price,
              category: req.body.category,
              createdAt: new Date()
            });

            console.log('product', product);

            res.status(200).json({ message: 'Product Created' });
          } catch (error: any) {
            res.status(500).json({ error: 'Internal Error', errorDetail: 'An unexpected error occurred' });
          }

          break;
        case 'LIST':
          try {
            const dataList = await Product.find({}).exec();
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
