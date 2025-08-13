import { useEffect, useState } from "react";
import { ProfilePhoto } from "./allCard";
import { Link } from "react-router-dom";

interface NavProps {
  landingPage?: boolean;
  isLoggedIn?: boolean;
  aboutPage?: boolean;
} //we make both optional so that one can passs any one or no prop during rendering navbar

export const Navbar = ({
  landingPage = false,
  isLoggedIn = false,
  aboutPage = false
}: NavProps) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  let rightContent;

  if (landingPage) {
    // Case 1: Landing page
    rightContent = (
      <Link to="/about" className="relative inline-block px-4 py-2 font-medium group">
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#320044] group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
        <span className="absolute inset-0 w-full h-full bg-[#c082d6] border-2 border-[#320044] group-hover:bg-[#320044] rounded-md"></span>
        <span className="relative text-[#320044] group-hover:text-white font-medium rounded-md">About Us</span>
      </Link>
    );
  } else if (aboutPage) {
    // Case 2: About Us page
    rightContent = (
      <Link to="/blogs" className="relative inline-flex items-center justify-center px-3 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#6a1b6f] rounded-full shadow-md shadow-[#8c2394] group">
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#6a1b6f] group-hover:translate-x-0 ease">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-[#6a1b6f] transition-all duration-300 transform group-hover:translate-x-full ease">Start Reading</span>
        <span className="relative invisible">Start Reading</span>
      </Link>
    );
  } else {
    // Case 3: For other pages(blogs, blog, publish)
    rightContent = (
      <>
        <Link to="/publish">
          <button type="button" className="mr-8 cursor-pointer text-white bg-purple-700 hover:bg-slate-200 hover:text-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2">
            Write
          </button>
        </Link>
        {isLoggedIn && <ProfilePhoto size="big" name={username} />}
      </>
    );
  }

  return (
    <div className="border-b shadow-lg flex justify-between items-center px-10 py-4">
      <Link to="/blogs" className="flex items-center justify-center text-2xl text-slate-950 font-mono">
        Podium
      </Link>
      <div>{rightContent}</div>
    </div>
  );
};
