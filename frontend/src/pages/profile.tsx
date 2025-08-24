import { Navbar } from "../components/navbar";
import { useProfile } from "../hooks/hooks";
import type {UserProfile} from "../hooks/hooks"
import {ProfileComponent} from "../components/userProfile"


export function Profile() {
  const { load, user } = useProfile() as { load: boolean; user: UserProfile };

  if(load){
        return <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <div className="text-center text-xl text-slate-700 font-light animate-pulse">
            Loading Your Profile...
            </div>
        </div>
    }
    
    if(!user){
        return <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <div className="text-center text-xl text-slate-700 font-light">
            Error loading profile. Please try again later.
            </div>
        </div>
    }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5dfff]">
      {localStorage.getItem("token") ? <Navbar isLoggedIn = {true} /> : <Navbar />}

      <ProfileComponent user={user} />

    </div>
  );
}


