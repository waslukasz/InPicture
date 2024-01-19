import IAlbum from '../interfaces/IAlbum'

const URL: string = 'https://jsonplaceholder.typicode.com/albums';

export async function getAllPosts() : Promise<IAlbum[]> {
    const response = await fetch(URL);
    if(!response.ok) throw new Error('Failed to fetch albums.');
    return await response.json();
}

export async function getAllPostsByUserId(id: number) : Promise<IAlbum[]> {
    const response = await fetch(`${URL}?userId=${id}`);
    if(!response.ok) throw new Error('Failed to fetch albums by userID.');
    return await response.json();
}