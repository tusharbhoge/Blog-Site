import { AppBar } from "../components/AppBar";
import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { BACKEND_URL } from "../config";
import type { CreateBlogInput } from "@iotive/medium-common";
import { useNavigate } from "react-router-dom";

interface BlogEditorProps {
  onSubmit?: (data: CreateBlogInput) => void;
}

export function Publish({ onSubmit }: BlogEditorProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const blogData: CreateBlogInput = {
      title,
      content,
      published: true, 
    };

    if (onSubmit) {
      onSubmit(blogData);
    } else {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, blogData,{headers: {
                Authorization: localStorage.getItem("token")
            }});
        if (response.status === 200 || response.status === 201) {
          alert('Blog published successfully!');
          setTitle('');
          setContent('');
          navigate("/blogs"); 
        } else {
          alert('Failed to publish blog.');
        }
      } catch (error) {
        console.error('Error publishing blog:', error);
        alert('An error occurred while publishing.');
      }
    }
  };

  return (
    <>
      <AppBar name={"tushar"} />
      <div className="max-w-2xl mx-auto p-4 ">
        <h2 className="text-2xl font-bold mt-20 mb-4">Write a Blog Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-gray-300 p-2"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="border border-gray-300 p-2 h-60 resize-none"
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-slate-800 text-white px-4 py-2 rounded-xl w-[140px] hover:bg-slate-900"
          >
            Publish Post
          </button>
        </form>
      </div>
    </>
  );
}
