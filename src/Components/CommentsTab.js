import React, { useState, useRef } from 'react';

export default function () {
    const [comments, setComments] = useState([
        { id: '342', comment: "hello" },
        { id: '27686', comment: "world" },
    ]);
    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState('');
    const textarea = useRef();

    const addNewComment = () => {
        if (newComment.trim() !== '') {
            setComments(comments.concat({ id: newID(), comment: newComment.trim() }));
            setNewComment('');
        }
        textarea.current.focus();
    }

    const deleteComment = (comment) => {
        setComments(comments.filter(_ => _.comment !== comment));
    }

    const handleOnChangeComment = ({ target }) => {
        const { id, value } = target;
        setEditingId(id)
        const updatedComments = comments.map(comment => {
            if (comment.id === id) {
                return { id: comment.id, comment: value };
            }
            return comment;
        });
        setComments(updatedComments);
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
                        <div key={id} className="row">
                            <div className="col-10">
                                <textarea
                                    id={id}
                                    className="comment p-3"
                                    value={comment}
                                    onChange={handleOnChangeComment}
                                    onBlur={() => setEditingId('')}
                                />
                            </div>
                            <div className="col-2 flex-row align-items-center buttons">
                                {editingId === id &&
                                    <button
                                        type="button"
                                        className="btn btn-success align-middle m-1 px-2"
                                        onClick={deleteComment}
                                    >Save</button>
                                }
                                <button
                                    type="button"
                                    className="btn btn-secondary align-middle m-1 px-2"
                                    onClick={deleteComment}
                                >Copy</button>
                                {editingId !== id &&
                                    <button
                                        type="button"
                                        className="btn btn-danger align-middle m-1 px-2"
                                        onClick={() => deleteComment(comment)}
                                    >
                                        Delete
                                    </button>
                                }
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export const newID = (length = 7) =>
    Math.random()
        .toString(36)
        .substr(-1 * (length));
