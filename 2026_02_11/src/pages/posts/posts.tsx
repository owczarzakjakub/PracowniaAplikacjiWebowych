import {Link} from "react-router";
import styles from "./posts.module.scss";
import {usePosts} from "../../hooks/usePosts.ts";


export default function Posts(){

    const {data:posts, isLoading, isError} = usePosts();

    return(
        <div className={styles.posts}>
            {isLoading && (
                <>Trwa ladowanie...</>
            )}
            {isError && (
                <>Wystapil nieczokiwany blad</>
            )}
            {!isLoading && !isError && posts && (
                <>
                    {posts.length > 0 && (
                        <>
                            {posts.map(Post => (
                                <div key={Post.id} className={styles.postsPost}>
                                    <h5 className={styles.postsTitle}>
                                        {Post.title}
                                    </h5>
                                    <p className={styles.postsBody}>
                                        {Post.body.substring(0, 50)};
                                    </p>
                                    <Link className={styles.postsLink}
                                        to={`posts/Post/${Post.id}`}
                                    >Przejdz do wpisu
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                    {posts.length == 0 && (
                        <>Brak postow</>
                    )}
                </>
            )}
        </div>
    )

}