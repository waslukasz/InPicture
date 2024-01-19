import IUser from '../interfaces/IUser'

const URL: string = 'https://jsonplaceholder.typicode.com/users';

export async function getAllUsers() : Promise<IUser[]> {
    const response = await fetch(URL);
    if(!response.ok) throw new Error('Failed to fetch users.');
    return await response.json();
}

export async function getUserById(id: number) : Promise<IUser> {
    const response = await fetch(`${URL}/${id}`);
    if(!response.ok) throw new Error('Failed to fetch user by ID.');
    return await response.json();
}

export async function getUserByUsername(username: string) : Promise<IUser> {
    const response = await fetch(`${URL}?username=${username}`);
    if(!response.ok) throw new Error('Failed to fetch user by username.');
    return await response.json();
}