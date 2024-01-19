import ProfilePicture from '../assets/avatar.jpg';
import Comments from './Comments';
import {getUserById} from '../requests/UserRequest'
import { useEffect, useState } from 'react';
import IPost from '../interfaces/IPost';

export default function Post({data}: {data: IPost}) {
    const [user, setUser] = useState({username: 'Loading...'});
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            setIsFetching(true);
            try {
                const user = await getUserById(data.userId);
                setUser(user);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchUser();
    }, [])

    return (
        <div className='inline-flex flex-col gap-3 p-5 bg-slate-600 rounded-md w-[512px]'>
            <div className="flex items-center gap-2">
                <img className='h-7 rounded-full' src={ProfilePicture} alt="x" />
                <span className='text-blue-400 font-bold'>{isFetching && <p className="text-center">Loading...</p>} {!isFetching && user.username}</span>
            </div>
            <div>{data.body}</div>
            <img className='rounded-md w-[512px]' src="https://via.placeholder.com/512/DDA77B" alt="photo" />
            <div>
                <Comments postId={data.id}/>
            </div>
        </div>
    );
}