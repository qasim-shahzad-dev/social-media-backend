// import { createClient } from "redis";
// import dotenv from "dotenv";
// dotenv.config();

// console.log("test");

// const redisClient = createClient({
//   socket: {
//     host: process.env.redis_host,
//     port: process.env.redis_port,
//   },
//   username:process.env.redis_username,
//   password:process.env.redis_password,
//   // legacyMode: true, // 👈 important
// }as any);

// redisClient.on("error", (err) => {
//   console.error("Redis Client Error", err);
// });

// (async () => {
//   try {
//     await redisClient.connect();
//     console.log("Redis connected successfully");

//     // Test legacy GET call
//     const legacy = redisClient as any;
//     legacy.get("test", (err: any, reply: any) => {``
//       if (err) console.error(err);
//       else console.log("Value for 'test':", reply);
//     });
//   } catch (error) {
//     console.error("Redis connection error", error);
//   }
// })();

// export default redisClient;
