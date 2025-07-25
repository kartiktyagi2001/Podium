import { useEffect, useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../config";


export const useBlogs = ()=>{
   const [load, setLoad] = useState(true);
   const [posts, setPosts] = useState([]);

   useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/post/all`, {
        headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
        }
    })
    .then((response) => {
        setPosts(response.data.blogs)
        setLoad(false)
    })
    .catch(() => {
        setLoad(false)
    });
   }, [])
   
   return{
    load, posts
   }
}

export type BlogPost = {
    id: string;
    author: { name: string };
    title: string;
    description: string;
    created_at: Date;
};

export const useBlog = ({id}: {id: string})=>{

    const [load, setLoad] = useState(true);
    const [post, setPost] = useState<BlogPost>();

    useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/post/get/${id}`, {
        headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
        }
    })
    .then((response) => {
        setPost(response.data.blog)
        setLoad(false)
    })
    .catch(() => {
        setLoad(false)
    });
    }, [])

    return{
    load, post
    }
}