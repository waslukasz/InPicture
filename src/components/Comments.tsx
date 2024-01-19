import Comment from './Comment';
import IComment from '../interfaces/IComment'
import { getCommentsByPostId } from '../requests/CommentRequest'
import { useEffect, useState } from 'react';

export default function Comments({postId}: {postId: number}) {
    const [commentsCount, setCommentsCount] = useState(3);
    const [comments, setComments] = useState<IComment[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [commentsHidden, setCommentsHidden] = useState(false);
    
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
    
    function loadMoreComments() {
        setCommentsCount((prevState) => prevState+5)
    }

    return (
        <div className="flex flex-col bg-slate-700 rounded-md p-3 gap-3">
            <div className='flex justify-between'><span>Comments ({comments.length}): </span><span className='font-bold hover:cursor-pointer hover:underline' onClick={() => setCommentsHidden(!commentsHidden)}>{commentsHidden && <>Show comments</>} {!commentsHidden && <>Hide comments</>}</span></div>
            <div className='flex'>
                <textarea className='w-3/4 rounded-md p-2 text-sm resize-none'/>
                <button className='p-1 bg-[#2b2b2b] text-blue-500 m-1 rounded-lg font-bold hover:text-[#2b2b2b] hover:bg-blue-500 transition-colors'>Add comment</button>
            </div>
            {!commentsHidden && 
            <>
                {isFetching && <p>Loading content...</p>}
                {!isFetching && comments.length > 0 && comments.slice(0, commentsCount).map((comment) => <Comment key={comment.id} data={comment}/>)}
                {!isFetching && commentsCount < comments.length && <button onClick={loadMoreComments}>Load more</button>}
            </>
            }     
        </div>
    );
}