import axios from "axios"
import { Navbar } from "../components/navbar"
import { BACKEND_URL } from "../config"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useBlogs } from "../hooks/hooks"



export const Publish = () =>{

    const navigate = useNavigate();
    const[title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [showCustom, setShowCustom] = useState(true);
    const {load} = useBlogs() as { load: boolean };

    const hasAlerted = useRef(false)

  //checking if user is authenticated or not then only we render publishing page
  useEffect(()=>{
    if(hasAlerted.current) return;
    hasAlerted.current = true; //because user is alerted twice, thrice or sometimes 4 times (idk due to strictmode)

    if(!localStorage.getItem("token")){
      alert('Please signin to publish your Story!')
      navigate('/signin')
    }
  });

  //show custom loader for 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowCustom(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if(showCustom || load){
        return <CustomLoader />
    }
    return(
        <div className="bg-gradient-to-r h-screen w-screen from-purple-100 via-red-100  to-brown-100">
            <Navbar isLoggedIn={true} />
            
            <div className="flex justify-center w-full mt-10"> 
                <div className="max-w-screen-lg w-full p-5">           
                    <input onChange={(e)=>{
                        setTitle(e.target.value)
                    }} type="text" className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-gray-300 " placeholder="Title"></input>
                    <TextEditor onChange={(e)=>{
                        setDescription(e.target.value)
                    }} />

                    <div className="flex justify-end">
                        <button onClick={async () => {
                            try {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/post`,
                                {
                                title,
                                description
                                },
                                {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                                }
                            );
                            navigate(`/blog/${response.data.id}`);
                            } catch (err) {
                            alert("You must be logged in to publish a post.");
                            navigate('/signin');
                            console.error("Post publishing failed:", err);
                            } //try catch is not required here though coz i fixed page rendering without auth in useEffect above (before that it was required):)
                        }}
                        type="submit"
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-950 focus:ring-4 focus:ring-purple-200">
                        Publish post
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

function TextEditor({onChange}:{onChange: (e: ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return <div className="mt-2">
    <div className="w-full mb-4">
      <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 justify-between">
        <div className="mt-2 rounded-b-lg w-full">
          <textarea onChange={onChange} rows={10} className="focus:outline-none block w-full px-2 text-sm text-gray-800 bg-slate-50 border-0 pl-2" placeholder="Write an article..." required />
        </div>
      </div>
    </div>
  </div>
}

//jsut an effect for loading
function CustomLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-purple-100">
      <div className="text-xl font-thin text-purple-500 font-semibold animate-bounce">
        Crafting your creative canvas... ✍️
      </div>
    </div>
  );
}
