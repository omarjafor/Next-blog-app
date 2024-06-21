'use client';
import AddNewBlog from "@/components/add-new-blog";
import { useState } from "react";

const initialData = {
    title: '',
    description: ''
}

const Blogs = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialData);

    async function handleBlogData(){
        try {
            setLoading(true);
            const apiResponse = await fetch('/api/add-blog', {
                method: 'POST',
                body: JSON.stringify(blogFormData),
            });
            const result = await apiResponse.json();
            if(result?.success){
                setBlogFormData(initialData);
                setLoading(false);
                setOpenModal(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setBlogFormData(initialData);
        }
    }

    return (
        <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
            <div>
                <AddNewBlog
                    handleBlogData={handleBlogData}
                    blogFormData={blogFormData}
                    setBlogFormData={setBlogFormData}
                    loading={loading}
                    setLoading={setLoading}
                    openModal={openModal}
                    setOpenModal={setOpenModal} />
            </div>
            <div>
                <h2 className="text-3xl text-white font-bold mb-4">All Blogs Here</h2>
            </div>

        </div>
    );
};

export default Blogs;