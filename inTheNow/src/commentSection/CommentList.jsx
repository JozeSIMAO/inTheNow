import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { auth } from '../authentication/FirebaseConfig';

function CommentList() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className='mx-1 my-1'>
      {currentUser ? (
        <div className='form bg-dark p-3 rounded'>
          <div>
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CommentList;
