import connectDB from "@/app/database";
import Blog from "@/app/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        const { title, description } = data;

        const { error } = AddNewBlog.validate({
            title, description
        })

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }

        const newBlogItem = await Blog.create(data);
        if (newBlogItem) {
            return NextResponse.json({
                success: true,
                message: 'Blog added successfully'
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