import { Link } from "react-router-dom";


interface BlogCardProps{
    author: string;
    title: string;
    description: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    author,
    title,
    description,
    publishedDate,
    id
}: BlogCardProps)=>{
    return (
        
        <Link to={`/blog/${id}`} onClick={() => localStorage.setItem("author", author)}>
            <div className="border-b border-slate-300 p-4 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="">
                    <div className="flex">
                        
                        <div className="flex flex-col justify-center">
                            <ProfilePhoto name={author} size={"small"} />
                        </div>
                        <div className="pl-2 text-slate-800 flex justify-center font-light">
                            {author}
                        </div>
                        <div className="pl-2 text-slate-500 text- flex justify-center font-thin">
                            {publishedDate}
                        </div>
                    </div>
                    <div className="font-semibold text-xl pt-2">
                        {title}
                    </div>
                    <div className="font-thin text-md">
                        {description.slice(0, 100) + "..."} 
                    </div>
                    <div  className="font-thin text-sm text-slate-400 pt-4">
                        {`${Math.ceil(description.length/100)} minutes read`}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export function ProfilePhoto({name, size = "small"}: {name: string, size: "small" | "big"}){
    
    return(
        <div className={`relative inline-flex items-center justify-center ${size==="small" ? "h-6 w-6" : "h-8 w-8"} overflow-hidden bg-gray-200 rounded-full`}>
            <span className={`${size==="small" ? "text-sm" : "text-md"} text-orange-500`}>{name[0]}</span>
        </div>
    )

}