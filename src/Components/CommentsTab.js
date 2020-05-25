import React, { useState, useRef } from 'react';



export default function () {
    const [comments, setComments] = useState([
        { id: 342, comment: "hello" },
        { id: 27686, comment: "world" },
    ]);
    const [newComment, setNewComment] = useState('');
    const textarea = useRef();

    const addNewComment = () => {
        setComments(comments.concat(newComment));
        setNewComment('');
        textarea.current.focus();
    }
    const deleteComment = (e) => {
        // setComments(comments.concat(newComment));
        // const formData = new FormData(e.target);
        // console.log("dddd", formData.get("comment-1"));

    }

    return (
        <div className="container p-5">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">New comment</label>
                <textarea
                    ref={textarea}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Write a new comment here and click 'Add'"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                />
                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary mt-2 px-5"
                        onClick={addNewComment}
                    >
                        Add
                </button>
                </div>

                <p><strong>Comments: {comments.length}</strong></p>

                {comments.map(({ id, comment }) => {

                    return (
                        <div className="row" key={id}>
                            <div className="col-10">
                                <textarea className="comment p-3" defaultValue={comment} />
                            </div>
                            <div className="col-2 flex-row align-items-center x">
                                <button
                                    type="button"
                                    className="btn btn-secondary align-middle m-1 px-2"
                                    onClick={deleteComment}
                                >Copy</button>
                                <button
                                    type="button"
                                    className="btn btn-success align-middle m-1 px-2"
                                    onClick={deleteComment}
                                >Save</button>
                                <button
                                    type="button"
                                    className="btn btn-danger align-middle m-1 px-2"
                                    onClick={deleteComment}
                                >Delete</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )

}
