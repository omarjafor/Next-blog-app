import connectDB from "@/app/database";
import Blog from "@/app/models/blog";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await connectDB();
        const allBlogs = await Blog.find({});
        if(allBlogs){
            return NextResponse.json({
                success: true,
                data: allBlogs,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Something went wrong! Please try again later'
            });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later'
        });
    }
}