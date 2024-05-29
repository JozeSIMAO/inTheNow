import React from 'react';

function Comment({ comment }) {
  return (
    <div className="mt-2" style={{border:"1px solid white", padding:"4px"}}>
      <p className='text-light'><strong className='text-danger'>{comment.author}</strong> <em>{new Date(comment.date).toLocaleString()}</em></p>
      <p className='text-light'>👉{comment.text}</p>
    </div>
  );
}

export default Comment;
