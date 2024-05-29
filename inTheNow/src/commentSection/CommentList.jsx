import React from 'react';
import Comment from './Comment';

function CommentList() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];

  return (
   <div className='mx-1 my-1'>
        <div className='form bg-dark p-3 rounded'>
            <div>
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
            </div>
        </div>
    </div>
  );
}

export default CommentList;
