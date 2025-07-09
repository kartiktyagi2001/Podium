import { Navbar } from "../components/navbar"
import { BlogCard } from "../components/allCard"
import { useBlogs } from "../hooks/hooks"

type BlogPost = {
    id: string;
    author: { name: string };
    title: string;
    description: string;
};

export const Blogs = ()=>{

    const {load, posts} = useBlogs() as { load: boolean; posts: BlogPost[] };

    if(load){
        return <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <div className="text-center text-lg text-slate-600 font-light">
            Please wait...
            </div>
        </div>
    }

    return(
        <div>

            <Navbar />
        
            <div className="flex justify-center">
                <div>
                    {posts.map(item=><BlogCard
                        id={item.id}
                        author = {item.author.name}
                        title = {item.title}
                        description = {item.description}  
                        publishedDate = {'12th January, 2024'}
                    />)}
                    

                </div>
            </div>
        </div>
    )
}
