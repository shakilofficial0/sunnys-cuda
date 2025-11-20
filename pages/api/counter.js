import { createClient } from "redis";

const COUNTER_KEY = "sunny_cdi_counter";

let redisClient = null;

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on("error", (err) => console.error("Redis Client Error", err));

    await redisClient.connect();
  }
  return redisClient;
}

export default async function handler(req, res) {
  try {
    const client = await getRedisClient();

    if (req.method === "GET") {
      const value = await client.get(COUNTER_KEY);
      return res.status(200).json({ value: parseInt(value) || 0 });
    }

    if (req.method === "POST") {
      const newValue = await client.incr(COUNTER_KEY);
      return res.status(200).json({ value: newValue });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Redis Error:", error);
    return res.status(500).json({
      error: "Database error",
      details: error.message,
    });
  }
}
