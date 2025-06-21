import { Link } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <div className="flex justify-center w-[99vw] ">
      <div className="flex flex-col justify-start items-center w-full">
        <AppBar name={"tushar"} />
        <div className="mt-20">
         {blogs.map((blog, idx) => (
          <div className="flex flex-col p-10 gap-3 border-b-1 border-slate-100 w-full max-w-4xl ">
            <Link to={`/blog/${blog.id}`}>
              <BlogCard
                key={blog.id || idx}
                authorName={blog.author.name || "Anonymous"}
                publishedDate={"18 june 2025"}
                title={blog.title}
                content={blog.content}
              />
            </Link>
          </div>
        ))}
        </div>
 
      </div>
    </div>
  );
};
