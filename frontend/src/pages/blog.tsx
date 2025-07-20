import { SingleBlog } from "../components/singleCard";
import { useBlog } from "../hooks/hooks";
import {useParams} from 'react-router-dom'


type BlogPost = {
    id: string;
    author: { name: string };
    title: string;
    description: string;
    created_at: Date
};

export const Blog = ()=>{
    const {id} =  useParams();
    const { load, post } = useBlog({ id: id || "" }) as { load: boolean; post: BlogPost};

    
    if(load){
        return <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <div className="text-center text-xl text-slate-700 font-light animate-pulse">
            Please wait...
            </div>
        </div>
    }

    return (

        <div className="bg-gradient-to-r h-full md:h-screen w-screen from-purple-100 via-slate-100 to-pink-100">
            <SingleBlog blog={post} />
        </div>
    )

}