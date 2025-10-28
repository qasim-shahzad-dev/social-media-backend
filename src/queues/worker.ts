import { Worker } from "bullmq";
import logger from "../utils/logger";
import dotenv from "dotenv";
dotenv.config();

const connection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
};

const worker = new Worker(
  "notification-queue",
  async (job) => {
    const { type, userId, email } = job.data;
    logger.info({ message: "Processing notification job", jobId: job.id, type, userId, email });

    try {
      if (type === "welcome_email") {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
        console.log(`[Worker] Sent welcome email to ${email}`);
        logger.info({ message: "Successfully sent welcome email", jobId: job.id, userId });
      }
    } catch (error) {
      logger.error({ message: "Failed to process notification job", jobId: job.id, userId, error });
      throw error;
    }
  },
  { connection }
);

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down worker...");
  await worker.close();
  process.exit(0);
});

console.log("Worker started, listening for jobs...");
