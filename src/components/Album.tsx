import { useEffect, useState } from 'react';
import IAlbum from '../interfaces/IAlbum';
import { getAllAlbumsByUserId } from '../requests/AlbumRequest'

export default function Album({data}: {data: IAlbum}) {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        async function fetchAlbums() {
            setIsFetching(true);
            try {
                let albums = await getAllAlbumsByUserId(data.userId);
                setAlbums(albums);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchAlbums();
        console.log(albums);
    }, [])

    return (
        <>
           <div className='inline-flex flex-col flex-shrink w-[40%] m-5'>
                <div className='font-bold text-center'>{data.title}</div>
                <img className='rounded-md' src="https://via.placeholder.com/128/DDA77B" alt="Album cover" />
           </div>
        </>
    );
}