import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
  legacyMode: true, // 👈 important
}as any);

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully");

    // Test legacy GET call
    const legacy = redisClient as any;
    legacy.get("test", (err: any, reply: any) => {
      if (err) console.error(err);
      else console.log("Value for 'test':", reply);
    });
  } catch (error) {
    console.error("Redis connection error", error);
  }
})();

export default redisClient;
