import { useEffect, useRef, useState} from 'react'
import { updateComment, removeComment } from '../requests/CommentRequest'
import IComment from '../interfaces/IComment'
import editIcon from '../assets/edit.png'
import acceptIcon from '../assets/accept.png'
import removeIcon from '../assets/remove.png'

export default function Comment({data}: {data: IComment}) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [currentData, setCurrentData] = useState<IComment>(data);


    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [textAreaHeight, setTextAreaHeight] = useState("");
    const handleTextAreaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaHeight(e.target.value);
    }
    useEffect(() => {
        if (isEditing) {
            textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";
        }
    }, [isEditing, textAreaHeight])

    async function updateCommentHandler() {
        setIsEditing((prevState) => !prevState);
        if (!isEditing) return;
        if (textAreaRef.current?.value == data.body) return;
        if (textAreaRef.current?.value == '') return;

        const updatedComment: IComment = {
            postId: data.postId,
            id: data.id,
            name: data.name,
            email: data.email,
            body: textAreaRef.current!.value
        }
        setCurrentData(await updateComment(updatedComment));
    }

    async function removeCommentHandler() {
        await removeComment(currentData.id!);
        setIsDeleted(true)
    }

    return (
        <>
            {!isDeleted && 
                <div className="bg-slate-800 rounded-md p-2">
                <div className='flex justify-between'>
                    <div className="flex items-center gap-1 mb-1"> <span className="text-blue-500 text-sm">{data.email}</span></div>
                    <div className='flex gap-1 h-5'>
                        {!isEditing && <img src={editIcon} alt='Edit' onClick={updateCommentHandler} className='cursor-pointer' style={{filter: 'invert(96%) sepia(57%) saturate(3768%) hue-rotate(169deg) brightness(76%) contrast(81%)'}}></img>}
                        {isEditing && <img src={acceptIcon} alt='Edit' onClick={updateCommentHandler} className='cursor-pointer' style={{filter: 'invert(54%) sepia(62%) saturate(357%) hue-rotate(37deg) brightness(93%) contrast(80%)'}}></img>}
                        <img src={removeIcon} alt='Remove' onClick={removeCommentHandler}className='cursor-pointer' style={{filter: 'invert(21%) sepia(40%) saturate(2427%) hue-rotate(323deg) brightness(95%) contrast(85%)'}}/>
                    </div>
                    </div>
                
                <div className="text-xs h-full">
                    {!isEditing && currentData.body} 
                    {isEditing &&
                        <textarea className={'w-full h-full resize-none overflow-hidden'} rows={1} defaultValue={currentData.body} ref={textAreaRef} onChange={handleTextAreaHeight}>
                        </textarea>
                    }
                </div>
            </div>
            }
        </>
    );
}