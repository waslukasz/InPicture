import ITodo from '../interfaces/ITodo'

const URL: string = 'https://jsonplaceholder.typicode.com/todos';

export async function getAllTodosByUserId(id: number) : Promise<ITodo[]> {
    const response = await fetch(`${URL}?userId=${id}`);
    if(!response.ok) throw new Error(`Failed to fetch TODOs by userID.`);
    return await response.json();
}