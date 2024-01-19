import { useEffect, useState } from 'react';
import ProfilePicture from '../assets/avatar.jpg'
import IUser from '../interfaces/IUser'
import {} from '../interfaces/IUser'
import { getUserById } from '../requests/UserRequest'
import ProfileBucketList from './ProfileBucketList';
import ProfilePosts from './ProfilePosts';
import ProfileAlbums from './ProfileAlbums';


export default function Profile() {
    const [user, setUser] = useState<IUser>();
    const [selected, setSelected] = useState<number>(0);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUser() {
            setIsFetching(true);
            try {
                const user = await getUserById(1);
                setUser(user);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchUser();
    }, [])

    return (
        <div className='flex flex-col gap-3 mt-5 p-5 bg-slate-600 rounded-md w-[612px] items-center h-fit'>
            <div className="flex items-center gap-2 justify-center">
                <img src={ProfilePicture} alt="Avatar" className='w-24 rounded-full'/>
                <div className='text-blue-400 font-bold text-2xl'>{!isFetching && <>{user?.username}</>}</div>
            </div>
            <div>
                {!isFetching && 
                    <div className='inline-flex flex-col items-center m-5 bg-slate-700 rounded-md p-3'>
                        <div><span className='font-bold'>Email:</span> {user?.email}</div>
                        <div><span className='font-bold'>Phone:</span> {user?.phone}</div>
                        <div><span className='font-bold'>Website:</span> {user?.website}</div>
                        <div><span className='font-bold'>Company:</span> {user?.website}</div>
                    </div>
                }
            </div>
            
            <div className='flex flex-col bg-slate-900 w-full rounded-lg p-5'>
                <div className='flex w-full justify-evenly mb-10'>
                    <div onClick={() => setSelected(0)} className='bg-yellow-600 p-5 w-1/4 text-center rounded-md font-bold cursor-pointer hover:bg-yellow-200 hover:text-yellow-600'>Posts</div>
                    <div onClick={() => setSelected(1)} className='bg-yellow-600 p-5 w-1/4 text-center rounded-md font-bold cursor-pointer hover:bg-yellow-200 hover:text-yellow-600'>Albums</div>
                    <div onClick={() => setSelected(2)} className='bg-yellow-600 p-5 w-1/4 text-center rounded-md font-bold cursor-pointer hover:bg-yellow-200 hover:text-yellow-600'>Bucket list</div>
                </div>

                <div className='flex justify-center'>
                { selected == 0 && user?.id != null &&
                    <ProfilePosts key={0} userId={user!.id}/>
                }

                { selected == 1 && user?.id != null &&
                    <ProfileAlbums key={1} userId={user!.id}/>
                }

                { selected == 2 && user?.id != null &&
                    <ProfileBucketList key={2} userId={user!.id}/>
                }
                </div>
            </div>
        </div>


    );
}