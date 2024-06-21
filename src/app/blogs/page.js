import BlogOverview from "@/components/blog-overview";
import { Toaster } from "react-hot-toast";

async function fetchAllBlogs() {
    try {
        const apiResponse = await fetch('http://localhost:3000/api/get-blogs', {
            method: 'GET',
            cache: 'no-store'
        })

        const result = await apiResponse.json();
        return result?.data;

    } catch (error) {
        console.log(error);
    }
}

const Blogs = async () => {

    const blogList = await fetchAllBlogs();

    return (
        <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
            <BlogOverview blogList={blogList} />
            <div><Toaster /></div>
        </div>
    );
};

export default Blogs;