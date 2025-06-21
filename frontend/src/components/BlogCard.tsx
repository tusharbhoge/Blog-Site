

interface Blogcard {
    authorName : String;
    publishedDate : String;
    title : String;
    content : String;
}
export const BlogCard = ({authorName , publishedDate , title ,content}:Blogcard) => {
  return (
    <div className="">
        <div className="flex gap-2 justify-start items-center">
            <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-xl text-gray-600 dark:text-gray-300">{authorName[0]} </span>
            </div>
            <h2 className="font-semibold text-lg">{authorName} .</h2>
            <h2 className=" text-slate-500  ">{publishedDate} </h2>
        </div>
        <div className="flex flex-col justify-center gap-3 pb-6">
            <h1 className="text-2xl font-bold">{title} </h1>
            <h3 className="text-xl text-slate-700">{ content.length<=175 ? content : content.slice(0,180)+" ....."} </h3>
        </div>
        <div className="text-md text-slate-500">
            {`${Math.ceil(content.length/200)} min read`}
        </div>

    </div>
  )
} 
