import {Queue} from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const connection = {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,

        host: process.env.REDIS_HOST,
         port: Number(process.env.REDIS_PORT),
}as any ;
const notificationQueue = new Queue('Notification-queue', {connection});
export async function AddNotification(data:any){
    const job = await notificationQueue.add('new-notification', data);
    console.log(`Job ${job.id} added to the queue`);
    return job;
}

export default {notificationQueue};