import { useEffect, useState } from 'react';
import ProfilePicture from '../assets/avatar.jpg'
import IUser from '../interfaces/IUser'
import {} from '../interfaces/IUser'
import { getUserById } from '../requests/UserRequest'
import ProfileBucketList from './ProfileBucketList';
import ProfilePosts from './ProfilePosts';
import ProfileAlbums from './ProfileAlbums';
import { useParams } from 'react-router-dom';


export default function Profile() {
    const params = useParams<string>();

    const [user, setUser] = useState<IUser>();
    const [selected, setSelected] = useState<number>(0);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const select_default: string = 'bg-[#253C78] text-slate-400 transition-colors duration-300 p-5 w-1/4 text-center rounded-md font-bold cursor-pointer hover:bg-[#2B59C3] hover:text-white';

    const select_selected: string = 'bg-[#2B59C3] underline text-white transition-colors duration-300 p-5 w-1/4 text-center rounded-md font-bold cursor-pointer';

    useEffect(() => {
        async function fetchUser() {
            setIsFetching(true);
            try {
                const user = await getUserById(parseInt(params.id!));
                setUser(user);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchUser();
    }, [])

    return (
        <div className='flex flex-col gap-3 mt-5 p-5 bg-slate-600 rounded-md w-[612px] items-center h-fit'>
            <div className="flex items-center gap-2 justify-center mt-10">
                <img src={ProfilePicture} alt="Avatar" className='w-24 rounded-full'/>
                <div className='text-blue-400 font-bold text-2xl'>{!isFetching && <>{user?.username}</>}</div>
            </div>
            <div>
                {!isFetching && 
                    <div className='inline-flex flex-col items-center m-5 px-12 bg-slate-700 rounded-md p-3'>
                        <div><span className='font-bold'>Email:</span> {user?.email}</div>
                        <div><span className='font-bold'>Phone:</span> {user?.phone}</div>
                        <div><span className='font-bold'>Website:</span> {user?.website}</div>
                        <div><span className='font-bold'>Company:</span> {user?.website}</div>
                    </div>
                }
            </div>
            
            <div className='flex flex-col bg-slate-900 w-full rounded-lg p-5'>
                <div className='flex w-full justify-evenly mb-10'>
                    <div onClick={() => setSelected(0)} className={selected == 0 ? select_selected : select_default}>Posts</div>
                    <div onClick={() => setSelected(1)} className={selected == 1 ? select_selected : select_default}>Albums</div>
                    <div onClick={() => setSelected(2)} className={selected == 2 ? select_selected : select_default}>Bucket list</div>
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