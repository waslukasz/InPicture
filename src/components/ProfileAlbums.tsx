import { useEffect, useState } from 'react';
import IAlbum from '../interfaces/IAlbum';
import { getAllAlbumsByUserId } from '../requests/AlbumRequest'
import ProfileAlbum from './ProfileAlbum'

export default function ProfileAlbums({userId}: {userId: number}) {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        async function fetchAlbums() {
            setIsFetching(true);
            try {
                let albums = await getAllAlbumsByUserId(userId);
                setAlbums(albums);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchAlbums();
    }, [])

    return (
        <div className='flex flex-col gap-5'>
            <div className="text-xl font-bold text-center">My albums:</div>
            <div className='grid grid-cols-2 gap-3'>
                {!isFetching && albums.length > 0 && 
                    albums.map((album) => 
                        <ProfileAlbum key={album.id} data={album} />
                    )
                }
            </div>
                
        </div>
    );
}