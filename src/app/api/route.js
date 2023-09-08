import connect, {connectWithDelay} from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";



export async function GET(req) {
    await connect()
    console.log('GEEET REQUEST')
    console.log('GET REQUEST')
    return NextResponse.json({message: "HELLO!"});
};