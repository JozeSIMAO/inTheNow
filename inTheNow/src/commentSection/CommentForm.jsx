import React, { useState } from 'react';
import { auth } from '../authentication/FirebaseConfig';

function CommentForm({ addComment }) {
  const [text, setText] = useState('');
  const name = auth.currentUser ? auth.currentUser.email.replace(new RegExp("\\b" + "@gmail.com" + "\\b", "gi"), "") : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth.currentUser && text) {
      const newComment = {
        author: auth.currentUser.email,
        text,
        date: new Date().toISOString()
      };
      addComment(newComment);
      saveCommentsToLocal(newComment);
      setText('');
    }
  };

  const saveCommentsToLocal = (comment) => {
    const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
    const updatedComments = [...existingComments, comment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  return (
    <div className='my-2 mx-1'>
        <div className='form bg-dark p-3 rounded'>
            <form className="mx-2" onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <h1 className='text-light'>COMMENT SECTION</h1>
                    {auth.currentUser ? (
                        <label className='text-light'>
                            Name: <span className='fw-bold text-danger'>{name}</span>
                        </label>
                    ) : (
                        <label className='text-light'>
                            Name: Not logged in
                        </label>
                    )}
                </div>
                <div className='d-flex flex-column mb-2'>
                    {auth.currentUser ? (
                        <label className='text-light'>
                            Comment:
                            <textarea
                                type="text"
                                className='form-control bg-dark text-light mt-2'
                                value={text}
                                name="text"
                                rows="3"
                                onChange={(e) => setText(e.target.value)}
                                required 
                            />
                        </label>
                    ) : (
                        <div className='alert alert-danger text-center' role='alert'>
                            Sign In Or Register to comment and view comments!
                        </div>
                    )}
                    <button className="btn btn-primary fw-bold btn-outline-success my-2 text-light" style={{width:"100px"}} type="submit" disabled={!auth.currentUser}>
                    Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default CommentForm;
