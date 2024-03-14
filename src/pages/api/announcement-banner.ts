import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File, Fields, Files } from 'formidable';
import fs from 'fs';
import s3 from './libs/aws-config';
import { UserTask } from './models/UserTask';
import { Announcement } from './models/Announcement';
import connectToMongoDB from './libs/mongodb';
import runMiddleware from './libs/runMiddleware';
import { verifyToken } from './libs/verifyToken';
import Cors from 'cors';

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

                // Check if there are any files uploaded
                if (!files || !files.file) {
                    res.status(400).json({ error: 'No file uploaded' });
                    return;
                }

                // Ensure files.file is an array, and select the first file if it exists
                const file = Array.isArray(files.file) ? files.file[0] : files.file;

                // Read file content
                const fileContent = fs.readFileSync(file.filepath);

                const params = {
                    Bucket: 'spak-latest-data',
                    Key: (file as any).originalFilename, //file.originalFilename,
                    Body: fileContent,
                    ContentType: (file as any).mimetype //file.mimetype,
                };

                console.log('fields', fields);

                try {
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

            });

        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    }
};