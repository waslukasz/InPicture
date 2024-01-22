import { Link } from 'react-router-dom';
import IAlbum from '../interfaces/IAlbum';

export default function ProfileAlbum({data}: {data: IAlbum}) {
    return (
        <>
                <Link to={'/album/' + data.id} className='inline-flex flex-col flex-shrink w-[40%] m-5 bg-slate-700 p-3 rounded-md hover:bg-slate-600'>
                    <div className='font-bold text-center'>{data.title}</div>
                    <img className='rounded-md' src="https://via.placeholder.com/128/DDA77B" alt="Album cover" />
                </Link>
        </>
    );
}