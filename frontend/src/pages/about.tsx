import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export function About() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4dcff]">
      <Navbar aboutPage={true} />

      <div className="flex-1 flex items-center">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:ml-50 md:py-24">

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight text-slate-900 text-left">
            Turn fleeting thought into lasting words.
          </h1>

          <p className="mt-8 font-sans text-base md:text-lg lg:text-xl leading-relaxed text-slate-700 text-left">
            Podium is a modern, community-driven platform where writers can share
            their ideas, stories, and expertise with the world. Built with
            simplicity and creativity at its core, Podium offers a
            distraction-free writing experience, powerful publishing tools, and a
            vibrant space for readers to discover fresh voices. Whether you’re
            an aspiring author, a seasoned blogger, or someone with a story to
            tell, Podium gives you the stage to express yourself and connect
            with an engaged audience. Our mission is to make content creation
            effortless and enjoyable while fostering a culture of open knowledge
            sharing.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}


