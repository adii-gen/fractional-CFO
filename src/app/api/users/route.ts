import { UserTable } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        
        const user = await db.select().from(UserTable)
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error)
    }
    
}