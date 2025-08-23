import type { BlogPost } from "../hooks/hooks";
import { ProfilePhoto } from "./allCard";
import { Navbar } from "./navbar";
import MDEditor from "@uiw/react-md-editor";



//test log
// console.log(authorname);


export const SingleBlog = ({ blog }: { blog: BlogPost }) => {

  return (
    <div>
      {localStorage.getItem("token") ? <Navbar isLoggedIn = {true} /> : <Navbar />}

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 sm:px-6 md:px-10 pt-20 w-full max-w-screen-xl">
          <div className="md:col-span-8 order-1">
            <div className="text-4xl text-slate-950 font-bold">
              {blog.title}
            </div>
            <div className="text-slate-500 font-light pt-2">
              posted on {blog.created_at.toString().slice(0, 10)}
            </div>
            <div className="mt-4 text-gray-800">
              <MDEditor.Markdown 
                source={blog.description} 
                style={{ 
                  whiteSpace: 'pre-wrap', 
                  background: 'transparent',
                  color: 'rgb(31 41 55)',
                  fontSize: '1.125rem'
                }}
                data-color-mode="light"
              />
            </div>
          </div>

          <div className="md:col-span-4 p-4 order-2">
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
