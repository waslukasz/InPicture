import Post from './Post'
import IPost from '../interfaces/IPost'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../requests/PostRequest'

export default function Feed() {
    const [postCount, setPostCount] = useState<number>(10);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchAllPosts() {
            setIsFetching(true);
            try {
                let posts = await getAllPosts();
                posts = posts.sort(() => Math.random() - 0.5);
                setPosts(posts);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchAllPosts();
    }, [])

    function loadMorePosts() {
        setPostCount((prevState) => prevState+5)
    }

    return (
        <div className='flex flex-col gap-5 mt-5'>
            {isFetching && <p>Loading content...</p>}
            {!isFetching && posts.length > 0 && posts.slice(0, postCount).map((post) => <Post key={post.id} data={post}/>)}
            {!isFetching && postCount < posts.length && <button onClick={loadMorePosts}>Load more</button>}
        </div>
    );
}