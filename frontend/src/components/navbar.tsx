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
    <div className="border-b shadow-lg flex justify-between px-10 py-4">
      <div className="flex flex-col justify-center text-2xl text-slate-950 font-mono">
        <Link to={'/blogs'}>
            Podium
        </Link>
      </div>
      <ProfilePhoto size="big" name={username} />
    </div>
  );
}