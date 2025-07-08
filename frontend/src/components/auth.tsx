import { useState, type ChangeEvent } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { signupValidation } from '@arcbit/podium-common';
import axios from 'axios'
import {BACKEND_URL} from '../config'

export const Auth = ({type}: {type: "signup"|"signin"})=>{

    const navigate = useNavigate();

    //we used our custom zod package to verify the input fields i.e added typesafety
    const [postInputs, setPostInputs] = useState<signupValidation>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? 'signup' : 'signin'}`, postInputs);
            const jwt = response.data.jwt; //be sends an object with token, check in network tab response

            //test log
            console.log(jwt)
            alert(jwt)

            localStorage.setItem("token", jwt); //saved the jwt in browser so that it can be used to verify user auth via token validation
            
            navigate('/blogs');

        } catch(err){
            alert("try again !")
        }
    }


    return(
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className='p-4'>
                        <div className="text-4xl font-bold">
                            {type==="signup" ? 'Create an account.' : 'Welcome back.'}
                        </div>
                        <div className="text-slate-400 ">
                            {type=== "signup" ? "Already have an account?" : "Don't have an account?"} <Link to={type === "signup" ? '/signin' : '/signup'} className='underline'>{type === "signup" ? 'Signin' : 'Join Podium'}</Link>
                        </div>
                    </div>

                    <div className='mt-2'>
                        {type === "signup" ? <LabelledInput label="Name" placeholder="Kartik Tyagi" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value,
                                //this basically fetches all the input values of state variable with original value and then overrides one value ata time(name in this case)
                            })
                        }} /> : null}
                        <LabelledInput label="Email" placeholder="Kartik@mail.com" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value,
                            })
                        }} />
                        <LabelledInput label="Password" type= "password" placeholder="123@abc" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value,
                            })
                        }} />

                        <button onClick={sendRequest} type="button" className=" w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Signup" : "Signin"}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string
}

//lets user pass the values of label and placeholders

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
  return (
    //got this from flowbite website
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type ||"text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
