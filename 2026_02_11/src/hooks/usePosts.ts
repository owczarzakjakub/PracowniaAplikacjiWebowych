import {useQuery} from "@tanstack/react-query";
import type {Post} from "../types/post.ts";

const fetchPosts = async () => {
    return fetch("https://jsonplaceholder.typicode.com/posts")
            .then(respone => respone.json())
}

export const usePosts = () => {
    return useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts
    })
}