import AWS, { S3 } from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
    accessKeyId: 'AKIAQ7MH5YQ2VOZOC7X4',
    secretAccessKey: 'HuXNcKnNXX+Xiwt/pp1kp5DbnPXcppbwWfNM+HM0',
    region: 'ap-south-1', // e.g., 'us-east-1'
});

// Create an instance of the S3 service
const s3: S3 = new AWS.S3();

export default s3;