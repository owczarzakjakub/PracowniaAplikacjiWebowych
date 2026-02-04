import { useEffect, useState} from "react";
import type {Post} from "../../types/post.ts";
import {Link} from "react-router";
import styles from "./posts.module.scss";


export default function Posts(){

    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(respone => respone.json())
            .then(json => setPosts(json as Array<Post>))
            .catch(()=>{
                setIsError(true);
            })
            .finally(() => setIsLoading(false));
    })

    return(
        <div>
            {isLoading && (
                <>Trwa ladowanie...</>
            )}
            {isError && (
                <>Wystapil nieczokiwany blad</>
            )}
            {!isLoading && !isError && (
                <>
                    {posts.length > 0 && (
                        <>
                            {posts.map(Post => (
                                <div key={Post.id}>
                                    <h5>
                                        {Post.title}
                                    </h5>
                                    <p>
                                        {Post.body.substring(0, 50)};
                                    </p>
                                    <Link
                                        to={`posts/Post/${Post.id}`}
                                    >Przejdz do wpisu
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    )

}