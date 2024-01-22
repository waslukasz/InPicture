import { Link } from 'react-router-dom';
import IAlbum from '../interfaces/IAlbum';

export default function ProfileAlbum({data}: {data: IAlbum}) {
    return (
        <>
                <Link to={'/album/' + data.id} className='inline-flex flex-col justify-end bg-slate-700 p-3 rounded-md hover:bg-slate-600'>
                    <div className='font-bold text-center'>{data.title}</div>
                    <img className='rounded-md' src="https://via.placeholder.com/256/272D2D" alt="Album cover" />
                </Link>
        </>
    );
}