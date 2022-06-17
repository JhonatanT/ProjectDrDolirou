import { PrismaClient } from '.prisma/client';
import dotenv from 'dotenv'
import mongoose from "mongoose"

const prisma = new PrismaClient();

async function mongodb() 
{
    dotenv.config();
    const connectionString = process.env.DBM_CONN_STRING_DEV+'db_drdolirou'//+'?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
    await mongoose.connect(connectionString).then(() => console.log('connected mongo')).catch(e => console.log(e))
}

export { prisma, mongodb }