import { init, start } from "./server";
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DATABASE_HOST)

init().then(() => start());