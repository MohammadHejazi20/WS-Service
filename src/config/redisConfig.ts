/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import Redis from "ioredis";

export const redisPubSub = new Redis(); // A basic Redis connection

redisPubSub.on("connect", () => {
  console.log("Connected to Redis");
});
