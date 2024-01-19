import { useEffect, useState } from 'react';
import IPost from '../interfaces/IPost';
import { getAllPostsByUserId } from '../requests/PostRequest'
import Post from './Post';

export default function ProfilePosts({userId}: {userId: number}) {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        async function fetchPosts() {
            setIsFetching(true);
            try {
                let posts = await getAllPostsByUserId(userId);
                setPosts(posts);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchPosts();
    }, [])

    return (
        <div className='inline-flex flex-col gap-3 p- rounded-md w-[512px]'>
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className="text-xl font-bold">My posts:</div>

                {!isFetching && posts.length > 0 && 
                posts.map((post) => 
                        <Post key={post.id} data={post} />
                    )
                }
            </div>
        </div>
    );
}