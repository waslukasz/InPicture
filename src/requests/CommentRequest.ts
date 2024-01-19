import IComment from '../interfaces/IComment'

const URL: string = 'https://jsonplaceholder.typicode.com/comments';

export async function getCommentsByPostId(id: number) : Promise<IComment[]> {
    const response = await fetch(`${URL}?postId=${id}`);
    if(!response.ok) throw new Error(`Failed to fetch comments by postID.`);
    return await response.json();
}

export async function addComment(comment: IComment) {
    const response = await fetch(`${URL}`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            "Content:type": "application/json; charset=UTF-8;"
        },
    });
    if(!response.ok) throw new Error(`Failed to add comment.`);
    return await response.status;
}

export async function removeComment(id: number) {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE"
    });
    if(!response.ok) throw new Error(`Failed to remove comment.`);
    return await response.status;
}

export async function updateComment(comment: IComment) {
    const response = await fetch(`${URL}/${comment.id}`, {
        method: 'PUT',
        body: JSON.stringify(comment),
        headers: {
            "Content:type": "application/json; charset=UTF-8;"
        },
    });
    if(!response.ok) throw new Error(`Failed to update comment.`);
    return await response.status;
}