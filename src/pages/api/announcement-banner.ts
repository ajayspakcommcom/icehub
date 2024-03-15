import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File, Fields, Files } from 'formidable';
import fs from 'fs';
import s3 from './libs/aws-config';
import { Announcement } from './models/Announcement';
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
    await runMiddleware(req, res, cors);
    const user = verifyToken(req);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else {

        if (req.method === 'POST') {

            const form = new IncomingForm();
            form.parse(req, async (err: Error, fields: Fields, files: Files) => {

                if (err) {
                    console.error('Error parsing form:', err);
                    res.status(500).json({ error: 'Error parsing form' });
                    return;
                }

                switch (fields.type![0]) {



                    case 'CREATE':
                        try {

                            if (!files || !files.file) {
                                res.status(400).json({ error: 'No file uploaded' });
                                return;
                            }

                            const file = Array.isArray(files.file) ? files.file[0] : files.file;
                            const fileContent = fs.readFileSync(file.filepath);

                            const params = {
                                Bucket: 'spak-latest-data',
                                Key: (file as any).originalFilename,
                                Body: fileContent,
                                ContentType: (file as any).mimetype
                            };

                            const resp = await s3.upload(params).promise();
                            console.log('resp', resp);
                            const announcementData = { heading: fields.title![0], imgUrl: resp.Location, imgLink: fields.link![0] };

                            const announcementTask = await Announcement.create(announcementData);
                            console.log('announcementTask', announcementTask);

                            res.status(200).json({ message: 'File uploaded successfully' });
                        } catch (error) {
                            console.error('Error uploading file:', error);
                            res.status(500).json({ error: 'Error uploading file' });
                        }
                        break;

                    case 'LIST':
                        try {
                            console.log('List');
                            const dataList = await Announcement.find({}).exec();
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

                    case 'DELETE':
                        try {

                            console.clear();
                            console.log('fields.imgUrl![0]', fields.imgUrl![0]);

                            const deleteParams = {
                                Bucket: 'spak-latest-data',
                                Key: fields.imgUrl![0],
                            };

                            try {
                                const deleteResp = await s3.deleteObject(deleteParams).promise();
                                console.log('Successfully deleted', deleteResp);
                            } catch (error) {
                                console.error('Error deleting object:', error);
                            }

                            const annId = fields.announcementId![0];

                            if (!annId) {
                                return res.status(400).json({ message: 'announcement Id is required' });
                            }

                            const deleteAnnouncement = await Announcement.findByIdAndDelete(annId);

                            if (!deleteAnnouncement) {
                                return res.status(404).json({ message: 'Announcement Banner not found' });
                            } else {
                                res.status(200).json({ message: 'Task deleted successfully' });
                            }
                        } catch (error) {
                            console.error('Error deleting task:', error);
                            return res.status(500).json({ message: 'Internal server error' });
                        }
                        break;
                }

            });

        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }

    }
};