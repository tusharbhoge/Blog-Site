import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { ViewBlog } from "../components/ViewBlog";


export const Blog = () => {
  const {id}=useParams();
  const {loading,blog}= useBlog({
    id : id || ""
  })
  console.log(blog)
  if (loading){
    return( <div>
      loading...
    </div> )
  }
  if (!blog) {
    return null;
  }
  return (
    <ViewBlog viewBlog={ blog }/>
  )
}

 