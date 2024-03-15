import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File, Fields, Files } from 'formidable';
import fs from 'fs';
import s3 from './libs/aws-config';
import { HomeBanner } from './models/HomeBanner';
import connectToMongoDB from './libs/mongodb';
import runMiddleware from './libs/runMiddleware';
import { verifyToken } from './libs/verifyToken';
import Cors from 'cors';
import { MongooseError } from 'mongoose';

export const config = {
    api: {
        bodyParser: false,
    },
};

const cors = Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});


export default async (req: NextApiRequest, res: NextApiResponse) => {

    await connectToMongoDB();

    if (req.method === 'POST') {

        const form = new IncomingForm();
        form.parse(req, async (err: Error, fields: Fields, files: Files) => {

            if (err) {
                console.error('Error parsing form:', err);
                res.status(500).json({ error: 'Error parsing form' });
                return;
            }

            switch (fields.type![0]) {
                case 'LIST':
                    try {
                        const dataList = await HomeBanner.find({}).exec();
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

            }

        });

    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }

};