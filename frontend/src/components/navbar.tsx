import { useEffect, useState } from "react";
import { ProfilePhoto } from "./allCard";
import { Link } from "react-router-dom";


export const Navbar = ()=>{

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

    return (
    <div className="border-b shadow-lg flex justify-between items-center px-10 py-4">
      <Link to={'/blogs'} className="flex items-center justify-center text-2xl text-slate-950 font-mono">
          Podium
      </Link>

      <div>
        <Link to={'/publish'}>
          <button type="button" className="mr-8 cursor-pointer text-white bg-purple-700 hover:bg-slate-200 hover:text-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2">
              Write
          </button>
        </Link>  
        <ProfilePhoto size="big" name={username} />
      </div>
    </div>
  );
}