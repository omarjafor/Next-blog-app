import connectDB from "@/app/database";
import Blog from "@/app/models/blog";
import { NextResponse } from "next/server";



export async function DELETE(req){
    try {
        await connectDB();
        const {searchParams} = new URL(req.url);
        const getId = searchParams.get('id');

        if(!getId){
            return NextResponse.json({
                success: false,
                message: 'Blog id is required'
            })
        }

        const deleteBlog = await Blog.findByIdAndDelete(getId);
        if(deleteBlog){
            return NextResponse.json({
                success: true,
                message: 'Blog deleted successfull'
            })
        } else {
            return NextResponse.json({
                success: false,
                message: 'Something went wrong! Please try again'
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }
}