import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";  

dotenv.config(); 

const s3Client = new S3Client({region: "us-east-2", credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}});
const bucketName="curratory-bucket-test";

export async function uploadPhoto(blob) {
    const id = uuidv4(); 

    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: `pictures/${id}`,
            Body: blob, 
            ContentType: "image/png", 
        })
    )

    return id; 
}