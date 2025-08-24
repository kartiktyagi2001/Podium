import { Link, useNavigate } from "react-router-dom";
import type { UserProfile } from "../hooks/hooks";


export function ProfileComponent({user}: {user: UserProfile}){

    const navigate = useNavigate();

    return(
        <div className="px-10 flex flex-col items-center">
            <div className="h-full mt-10 w-full flex justify-center items center">
                <ProfilePhoto name={user.name} />
            </div>

            <div className="flex p-4 items-center justify-center text-gray-400">
                {user.bio}
            </div>

            <div className="mt-10">
                {/* <p className="flex text-gray-800 text-5xl justify-center">Posts</p> */}
                <div className="flex flex-col gap-5">
                    {user.posts.map((post) => (
                        <div key={post.id} className="">
                            <Link to={`/blog/${post.id}`}>
                                <div className="font-light text-md p-2 rounded-md bg-[#e2c9e8] text-[#34004e]">{post.title}</div>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>

            <div className="flex justify-center mt-10 mb-5 gap-5 items-center">
                                <button type="button" className="ml-3 text-[#ffffff] bg-gradient-to-br from-[#3a0044] to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium font-sans rounded-xl shadow-lg shadow-[#220b28] text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>{
                                    navigate("/blogs");
                                }}>Home</button>

                                <button type="button" className="ml-3 text-[#ffffff] bg-gradient-to-br from-[#440000] to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-500 font-medium font-sans rounded-xl shadow-lg shadow-[#280b0b] text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>{
                                    localStorage.removeItem("token");
                                    navigate("/");
                                }}>Logout</button>
            </div>
        </div>
    )
}

//custom profile photo for user profile, did not edit existing one in allCard.tsx to avoid cascading changes
function ProfilePhoto({ name }: { name: string }) {
    return (
        <div
            className="relative inline-flex items-center justify-center h-[10rem] w-[10rem] overflow-hidden bg-[#e2c9e8] rounded-full"
        >
            <span className="text-5xl text-orange-400">{name[0]}</span>
        </div>
    );
}