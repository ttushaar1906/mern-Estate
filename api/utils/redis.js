// backend/utils/redis.js
import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: process.env.REDISPASSWORD,
    socket: {
        host: process.env.REDISENDPOINT,
        port: Number(process.env.REDISPORT)
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('✅ Redis connected'));

await client.connect();

export default client;
