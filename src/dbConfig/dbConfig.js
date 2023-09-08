import mongoose from "mongoose";
import { NextResponse } from "next/server";

export default async function connect() {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB!')
        return true;
    } catch (err) {
        console.log("Something goes wrong during connection to database!");
        console.log(err.message);
        return false;
    }
};