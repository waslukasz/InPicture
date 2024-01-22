import { Link, useParams } from "react-router-dom";
import IAlbum from "../interfaces/IAlbum";
import { useEffect, useState } from "react";
import { getAlbumById } from "../requests/AlbumRequest";
import IUser from "../interfaces/IUser";
import { getUserById } from "../requests/UserRequest";
import { getAllPhotosByAlbumId } from "../requests/PhotoRequest";
import IPhoto from "../interfaces/IPhoto";
import Photo from "./Photo";


export default function Album() {
    const params = useParams<string>();
    const [album, setAlbum] = useState<IAlbum>();
    const [user, setUser] = useState<IUser>();
    const [photos, setPhotos] = useState<IPhoto[]>();

    useEffect(() => {
        Promise.all([getAlbumById(parseInt(params.id!))]).then(([album]) => {
            setAlbum(album);
            Promise.all([
                getUserById(album!.userId),
                getAllPhotosByAlbumId(album!.id)
            ])
            .then(([user, photos]) => {
                setUser(user);
                setPhotos(photos);
            });
        });
    }, []);

    return (
        <div className='flex flex-col gap-3 mt-5 p-5 bg-slate-600 rounded-md w-[612px] items-center h-fit'>
            <div className="flex flex-col items-center gap-2 justify-center">
                <div className="text-3xl font-bold text-center">{album?.title}</div>
                <div className='flex flex-col items-center text-xl'><div>created by</div>{<Link to={'/profile/' + user?.id} className='text-blue-400 font-bold'>{user?.username}</Link>}</div>
            </div>
            <div className="grid grid-cols-3 align-baseline">
                {photos?.map((photo) => <Photo key={photo.id} data={photo}/>)}
            </div>
        </div>
    );
}