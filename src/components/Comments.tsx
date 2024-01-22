import Comment from './Comment';
import IComment from '../interfaces/IComment'
import { addComment, getCommentsByPostId } from '../requests/CommentRequest'
import { useEffect, useRef, useState } from 'react';

export default function Comments({postId}: {postId: number}) {
    const [comments, setComments] = useState<IComment[]>([]);
    const [isUpdated, setIsUpdated] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [commentsHidden, setCommentsHidden] = useState<boolean>(true);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        async function fetchAllComments() {
            setIsFetching(true);
            try {
                let comments = await getCommentsByPostId(postId);
                setComments(comments);
            } catch (error) {}
            setIsFetching(false);
        }

        fetchAllComments();
    }, [])

    useEffect(() => {
        if(!isUpdated) setIsUpdated(true);
    }, [isUpdated])

    async function addCommentHandler() {
        // dodaje komentarz, ale api tworzy komentarz z tym samym ID, przez co wyswietla blad w konsoli przy wyswietlaniu kazdego kolejnego komentarza
        if (textAreaRef.current?.value == '') return;
        const newComment: IComment = {
            postId: postId,
            id: undefined,
            name: "username",
            email: "username@example.com",
            body: textAreaRef.current!.value
        }
        const result = await addComment(newComment);
        let newComments = comments;
        newComments.push(result);
        textAreaRef.current!.value = '';
        setComments(newComments);
        setIsUpdated(false);
    }

    return (
        <div className="flex flex-col bg-slate-700 rounded-md p-3 gap-3">
            <div className='flex justify-between'><span>Comments: </span><span className='font-bold hover:cursor-pointer hover:underline' onClick={() => setCommentsHidden(!commentsHidden)}>{commentsHidden && <>Show comments</>} {!commentsHidden && <>Hide comments</>}</span></div>
            <div className='flex'>
                <textarea ref={textAreaRef} className='w-3/4 rounded-md p-2 text-sm resize-none'/>
                <button onClick={addCommentHandler} className='bg-[#253C78] text-slate-400 transition-colors duration-300 p-1 w-1/4 text-center rounded-md font-bold cursor-pointer hover:bg-[#2B59C3] hover:text-white'>Add comment</button>
            </div>
            {!commentsHidden && 
            <>
                {isFetching && <p>Loading content...</p>}
                {!isFetching && comments.length > 0 && isUpdated && comments.map((comment) => <Comment key={comment.id} data={comment}/>)}
            </>
            }     
        </div>
    );
}