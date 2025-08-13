import { Navbar } from "../components/navbar"
import { BlogCard } from "../components/allCard"
import { useBlogs } from "../hooks/hooks"

type BlogPost = {
    id: string;
    author: { name: string };
    title: string;
    description: string;
    created_at: Date
};

export const Blogs = ()=>{

    const {load, posts} = useBlogs() as { load: boolean; posts: BlogPost[] };

    if(load){
        return <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <div className="text-center text-xl text-slate-700 font-light animate-pulse">
            Please wait...
            </div>
        </div>
    }

    return(
        <div>
            
            {localStorage.getItem("token") ? <Navbar isLoggedIn = {true} /> : <Navbar />}
        
            <div className="flex justify-center">
                <div>
                    {posts.map(item => (
                        <BlogCard
                            key={item.id}
                            id={item.id}
                            author={item.author.name}
                            title={item.title}
                            description={item.description}
                            publishedDate={item.created_at}
                        />
                    ))}

                </div>
            </div>
        </div>
    )
}
