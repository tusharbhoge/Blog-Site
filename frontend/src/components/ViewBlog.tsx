import { AppBar } from "./AppBar"
import type{Blog} from "../hooks"

export const ViewBlog = ({viewBlog}:{viewBlog:Blog}) => {
  return (
    <>
    <div className="w-screen justify-center items-start ">
        <AppBar name={"Tushar"}/>
        <div className="flex justify-center p-10 ">
          <div className="mt-20 flex justify-center p-10">
            <div className=" flex flex-col max-w-4xl pr-10">
                <h1 className="text-5xl pb-4 font-bold">{viewBlog.title}</h1>
                <h3 className="text-xl text-slate-400 pb-4">Published on 18 june 2025</h3>
                <h2 className="text-2xl text-slate-800">{viewBlog.content} </h2>
            </div>
            <div className="max-w-[350px]">
                <h3 className="text-xl ">Author</h3>
                <div className="flex items-center gap-6 pt-4">
                  <div>
                      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-xl text-gray-600 dark:text-gray-300">{viewBlog.author.name[0] || "A"} </span>
                      </div>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold pb-3">{viewBlog.author.name || "Anonymous"}</h2>
                    <h3 className="text-xl text-slate-500">A curious developer building cool stuff with React, Node.js, and Cloudflare Workers. Always learning. Always shipping.</h3>
                  </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
