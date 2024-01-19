import IPhoto from '../interfaces/IPhoto'

const URL: string = 'https://jsonplaceholder.typicode.com/photos';

export async function getAllPhotosByAlbumId(id: number) : Promise<IPhoto[]> {
    const response = await fetch(`${URL}?albumId=${id}`);
    if(!response.ok) throw new Error(`Failed to fetch photos by albumId.`);
    return await response.json();
}