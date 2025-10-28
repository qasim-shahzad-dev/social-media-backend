import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config();


export const redis = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

redis.on("connect", () => {
    console.log("Redis Connected");
});

redis.on("disconnect", () => {
    console.log("Redis Disconnected");
});

redis.on("error", (error) => {
    console.log(`Redis connection error: ${error}`);
});
