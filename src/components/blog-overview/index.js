'use client'
import React, { useEffect, useState } from 'react';
import AddNewBlog from '../add-new-blog';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import toast from 'react-hot-toast';

const initialData = {
    title: '',
    description: ''
}

const BlogOverview = ({ blogList }) => {

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialData);
    const [editBlogId, setEditBlogId] = useState(null);
    
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [])

    async function handleBlogData() {
        try {
            setLoading(true);
            const apiResponse = editBlogId !== null ?
            await fetch(`/api/edit-blog?id=${editBlogId}`, {
                method: 'PUT',
                body: JSON.stringify(blogFormData)
            })
            : await fetch('/api/add-blog', {
                method: 'POST',
                body: JSON.stringify(blogFormData),
            });
            const result = await apiResponse.json();
            if (result?.success) {
                setBlogFormData(initialData);
                setLoading(false);
                setOpenModal(false);
                setEditBlogId(null);
                router.refresh();
                toast.success(result.message)
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setBlogFormData(initialData);
        }
    }

    async function handleEdit(blog) {
        setEditBlogId(blog._id);
        setBlogFormData({
            title: blog?.title,
            description: blog?.description
        });
        setOpenModal(true);
    }

    async function handleDelete(id){
        try {
            setLoading(true);
            const apiResponse = await fetch(`/api/delete-blog?id=${id}`, {
                method: 'DELETE'
            });
            const result = await apiResponse.json();
            if(result?.success) {
                router.refresh();
                toast.success(result.message)
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <div>
            <div>
                <AddNewBlog
                    editBlogId={editBlogId}
                    setEditBlogId={setEditBlogId}
                    handleBlogData={handleBlogData}
                    blogFormData={blogFormData}
                    setBlogFormData={setBlogFormData}
                    loading={loading}
                    setLoading={setLoading}
                    openModal={openModal}
                    setOpenModal={setOpenModal} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {
                    blogList && blogList.length > 0 ?
                        blogList.map(blog =>
                            <Card className='p-5'>
                                <CardContent>
                                    <CardTitle className='mb-5'>{blog.title}</CardTitle>
                                    <CardDescription>{blog.description}</CardDescription>
                                    <div className="flex items-center mt-5 gap-5">
                                        <Button onClick={() => handleEdit(blog)}>
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(blog._id)}>
                                            {
                                                loading ? 'Loading...' : 'Delete'
                                            }
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                        : <Label className='text-3xl font-extrabold'>No Blog Found Here! Create new blog...</Label>
                }
            </div>
        </div>
    );
};

export default BlogOverview;