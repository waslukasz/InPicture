import { useEffect, useState } from 'react';
import ITodo from '../interfaces/ITodo';
import { getAllTodosByUserId } from '../requests/TodoRequest'
import completedIcon from '../assets/accept.png'

export default function ProfileBucketList({userId}: {userId: number}) {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        async function fetchTodos() {
            setIsFetching(true);
            try {
                let todos = await getAllTodosByUserId(userId);
                setTodos(todos);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchTodos();
    }, [])

    return (
        <div className='inline-flex flex-col gap-3 p- rounded-md w-[512px]'>
            <div className="flex flex-col gap-2">
                <div className="text-xl font-bold text-center">My bucket list:</div>
                {!isFetching && todos.length > 0 && 
                todos.map((todo) => 
                <div key={todo.id} className='h-3 flex items-center mb-1'>
                    {todo.completed &&
                    <img className='h-3 mr-3' src={completedIcon} alt='Completed' style={{filter: 'invert(54%) sepia(62%) saturate(357%) hue-rotate(37deg) brightness(93%) contrast(80%)'}}></img>}
                    <div>{todo.title}</div>
                </div>)}

            </div>
        </div>
    );
}