import IAlbum from '../interfaces/IAlbum'

const URL: string = 'https://jsonplaceholder.typicode.com/albums';

export async function getAllAlbums() : Promise<IAlbum[]> {
    const response = await fetch(URL);
    if(!response.ok) throw new Error('Failed to fetch albums.');
    return await response.json();
}

export async function getAlbumById(id: number) : Promise<IAlbum> {
    const response = await fetch(`${URL}/${id}`);
    if(!response.ok) throw new Error('Failed to fetch album by ID.');
    return await response.json();
}

export async function getAllAlbumsByUserId(id: number) : Promise<IAlbum[]> {
    const response = await fetch(`${URL}?userId=${id}`);
    if(!response.ok) throw new Error('Failed to fetch albums by userID.');
    return await response.json();
}