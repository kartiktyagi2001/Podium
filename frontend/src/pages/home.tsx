// import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import ParticleBackground from "../components/particle-bg";
import { TypeAnimation } from "react-type-animation";



export function Home() {

    const navigate = useNavigate();

    function startReading (){
        navigate("/blogs")
    }
    function memberSignin (){
        navigate("/signin")
    }

    const taglines = [
        "Where carefully crafted sentences go to meet curious minds", 2000,
        "For words too good to be left in the Notes app", 2000,
        "Because your brain deserves better than doomscrolling", 2500,
        "Step into the spotlight and let your Stories shine from the Podium, where readers and writers unite"

    ]

    // const tagline = useMemo(()=>{
    //     const i = Math.floor(Math.random() * taglines.length);
    //     return taglines[i];
    // }, [])


  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="mt-40 text-[#0d0117] font-serif ml-4 md:ml-6 lg:ml-45">
            <div className="text-6xl flex flex-col gap-4 md:flex-row">
                <h1 className="">Writer’s Stage,</h1>
                <h1>Reader’s Seat</h1>
            </div>

            <div className="h-3 mt-5 md:ml-3">
                <TypeAnimation
                    sequence={taglines}
                    speed={50}
                    deletionSpeed={99}
                    repeat={0}
                 />
            </div>

            <div className="mt-20">
                <button type="button" onClick={memberSignin} className="text-[#500649] font-sans bg-gradient-to-br from-[#e0c0ec] to-[#c082d6] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-xl shadow-lg shadow-[#fde7ff] text-sm px-5 py-2.5 text-center me-2 mb-2">Member Signin</button>

                <button type="button" onClick={startReading} className="ml-3 text-[#ffffff] font-sans bg-gradient-to-br from-[#320044] to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-xl shadow-lg shadow-[#250b28] text-sm px-5 py-2.5 text-center me-2 mb-2">Start Reading</button>
            </div>
            
            
        </div>

        <footer className="relative text-center z-10 mt-auto px-4 py-3 text-sm bg-[#3a123d] text-[#ffffff]">
            Made with 💜 by <a className="underline" href="https://github.com/kartiktyagi2001"><b>Arcbit</b></a>
        </footer>
            

        <div className="relative w-full h-full overflow-hidden">
        <ParticleBackground />
        </div>
    </div>
    
  );
}

//  Because your brain deserves better than doomscrolling.
//  We collect sentences the way others collect stamps.
//  For words too good to be left in the Notes app.
//  Where carefully crafted sentences go to meet curious minds.