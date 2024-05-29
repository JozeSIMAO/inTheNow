
function Comment({ comment }) {
  const author = comment.author.replace(new RegExp("\\b" + "@gmail.com" + "\\b", "gi"), "");


  return (
    <div className="mt-2" style={{ border: "1px solid white", padding: "4px" }}>
        <div>
          <p className='text-light'><strong className='text-danger'>{author}</strong> <em>{new Date(comment.date).toLocaleString()}</em></p>
          <p className='text-light'>👉{comment.text}</p>
        </div>
    </div>
  );
}

export default Comment;
