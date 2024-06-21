'use client';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddNewBlog = ({ openModal, setOpenModal, blogFormData, setBlogFormData, loading, handleBlogData }) => {
    
    return (
        <div>
            <Button onClick={() => setOpenModal(true)}>
                Add New Blog
            </Button>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Blog</DialogTitle>
                        <DialogDescription>
                            Make changes or create new blog here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input 
                                name='title'
                                placeholder='Enter Blog Title Here'
                                value={blogFormData.title}
                                onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})}
                                id="title"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input
                                name='description'
                                placeholder='Enter Blog Description Here'
                                value={blogFormData.description}
                                onChange={(e) => setBlogFormData({ ...blogFormData, description: e.target.value })}
                                id="description"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleBlogData} type="button">
                            {
                                loading ? 'Loading....' : 'Save changes'
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewBlog;