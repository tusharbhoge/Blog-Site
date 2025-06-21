import { Link } from "react-router-dom";

interface AppBar{
    name:String;
}
export const AppBar = ({name}:AppBar) => {
  return (
    <div className="w-full flex justify-between h-20 px-15 py-3 items-center border-b border-slate-100 fixed bg-white z-10">
        <Link to={"/blogs"}>
            <h1 className="text-3xl font-bold cursor-pointer">medium</h1>
        </Link>
        <div className="flex gap-5 justify-center items-center">
            <Link to={"/publish"}> 
                <div className=" bg-green-600 rounded-2xl px-4 py-1">
                    New
                </div>
            </Link>
            
            <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-xl text-gray-600 dark:text-gray-300">{name[0]} </span>
        </div>
        </div>
        

    </div>
  )
}
