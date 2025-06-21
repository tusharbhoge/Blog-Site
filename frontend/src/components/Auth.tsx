import { Link, useNavigate } from "react-router-dom";
import type { SigninInput, SignupInput } from "@iotive/medium-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth = ({type} : {type : "signup"|"signin"}) => {
  const navigate = useNavigate();
  type InputType = SignupInput | SigninInput;
  const [postInput, setPostInput] = useState<InputType>({
    ...(type === "signup" ? { name: "" } : {}),
    username: "",
    password: ""
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup":"signin"}`,postInput);
      const jwt = response.data;
      localStorage.setItem("token",jwt);
      navigate('/blogs')

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-20">
        <Header type = {type} />
        <div className="w-full max-w-[400px]">
          {type === "signup" ? <LablledInputBox lable="Name" placeholder="Tushar Bhoge" onChange={(e) => { setPostInput(prev => ({ ...prev, name: e.target.value }))}} /> : null }
          <LablledInputBox lable="Username" placeholder="tushar@gmail.com" onChange={(e) => { setPostInput(prev => ({ ...prev, username: e.target.value })) }} />
          <LablledInputBox lable="Password" isPassword={true} placeholder="*******" onChange={(e) => { setPostInput(prev => ({ ...prev, password: e.target.value })) }} />
          <Button type={type} onClick={sendRequest}/>
        </div>
    </div>
  )
}

const Header = ({ type }: { type: "signup" | "signin" }) => {

  return (
    <>
    <div className="flex flex-col justify-center items-center">
        <div className="text-4xl font-bold pb-4">
          {type === "signup" ? "Create an Account" : "Login to your Account"}
        </div>
        <div className="text-xl font-semibold pb-4 text-slate-600">
          {type === "signup" ? (
            <>
              Already have an account? <Link to="/signin" className="text-blue-500 underline">Sign in</Link>
            </>
          ) : (
            <>
              Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign up</Link>
            </>
          )}
        </div>
    </div>
    </>
  );
}

interface LablledInput {
  lable: string;
  placeholder: string;
  isPassword?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LablledInputBox = ({ lable, placeholder, isPassword, onChange }: LablledInput) => {
  return (
    <div className="flex flex-col pb-5 w-full">
      <label className="pb-2 text-xl font-semibold">{lable}</label>
      <input
        className="border border-slate-400 rounded-xl w-full px-4 py-3"
        placeholder={placeholder}
        onChange={onChange}
        type={isPassword ? "password" : undefined}
      />
    </div>
  );
};

const Button =({ type, onClick }: { type: "signup" | "signin", onClick: () => void })=>{
  return(
    <div>
      <button onClick={onClick} type="button" className="w-full mt-4 text-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  px-5 py-4 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Signup" : "Signin"}</button>
    </div>
  )
}

