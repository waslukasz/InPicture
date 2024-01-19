import IPost from '../interfaces/IPost'

const URL: string = 'https://jsonplaceholder.typicode.com/posts';

export async function getAllPosts() : Promise<IPost[]> {
    const response = await fetch(URL);
    if(!response.ok) throw new Error(`Failed to fetch posts.`);
    return await response.json();
}

export async function getAllPostsByUserId(id: number) : Promise<IPost[]> {
    const response = await fetch(`${URL}?userId=${id}`);
    if(!response.ok) throw new Error(`Failed to fetch photos by userID.`);
    return await response.json();
}