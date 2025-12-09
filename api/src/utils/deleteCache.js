import client from "../utils/redis.js";

export async function deletePattern(pattern) {
  const keys = await client.keys(pattern);
  if (keys.length > 0) {
    await client.del(keys);
  }
}
