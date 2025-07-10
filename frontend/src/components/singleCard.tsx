import type { BlogPost } from "../hooks/hooks";
import { ProfilePhoto } from "./allCard";
import { Navbar } from "./navbar";



//test log
// console.log(authorname);


export const SingleBlog = ({ blog }: { blog: BlogPost }) => {

  return (
    <div>
      <Navbar />

      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-20 w-full  max-w-screen-xl p-10">
          <div className="col-span-8">
            <div className="text-4xl text-slate-950 font-bold">
              {blog.title}
            </div>
            <div className="text-slate-500 font-light pt-2">
              posted on 1/1/2021
            </div>
            <div className="mt-4 text-lg text-gray-800">
              {blog.description}
            </div>
          </div>

          <div className="col-span-4 p-4 m-10">
            <div className="text-slate-900">
              Author
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="flex justify-center items-center"><ProfilePhoto name={blog.author.name} size="big"/></div>

              <div className="">
                <div className="text-xl font-semibold">{blog.author.name}</div>
                <div className="text-slate-500 font-light mt-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
