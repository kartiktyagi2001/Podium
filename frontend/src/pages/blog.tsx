import { SingleBlog } from "../components/singleCard";
import { useBlog } from "../hooks/hooks";
import {useParams} from 'react-router-dom'


type BlogPost = {
    id: string;
    author: { name: string };
    title: string;
    description: string;
};

export const Blog = ()=>{
    const {id} =  useParams();
    const { load, post } = useBlog({ id: id || "" }) as { load: boolean; post: BlogPost};

    
    if(load){
        return <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <div className="text-center text-lg text-slate-600 font-light">
            Please wait...
            </div>
        </div>
    }

    return (

        <div>
            <SingleBlog blog={post} />
        </div>
    )

}