import connectDB from "@/app/database";
import Blog from "@/app/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

export async function PUT(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const getId = searchParams.get('id');

        if (!getId) {
            return NextResponse.json({
                success: false,
                message: 'Blog id is required'
            })
        }

        const { title, description } = await req.json();
        const { error } = EditBlog.validate({
            title, description
        })

        const updateBlog = await Blog.findOneAndUpdate(
            { _id: getId },
            { title, description },
            { new: true })
            
        if (updateBlog) {
            return NextResponse.json({
                success: true,
                message: 'Blog updated successfully'
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