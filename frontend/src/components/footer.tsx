import githubIcon from "../assets/github2.svg"

export function Footer(){
    return(
        <footer className="relative text-center z-10 mt-auto px-4 py-3 text-sm bg-[#3a123d] text-[#ffffff] flex justify-center items-center gap-2">
            Made with 💜 by <a className="underline" href="https://github.com/kartiktyagi2001"><b>Arcbit</b></a>

            <a href="https://github.com/kartiktyagi2001" className="ml-4"><img src={githubIcon} alt="github" width={20} height={20} /></a>
        </footer>
    )
}