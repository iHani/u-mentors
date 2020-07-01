import React, { useState, useRef } from "react";

const uMentorsKey = "u-mentors";

export default function () {
  const savedComments = JSON.parse(localStorage.getItem(uMentorsKey)) || [];
  const [displayedComments, setComments] = useState(savedComments);
  const [newComment, setNewComment] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const textarea = useRef();
  const searchInput = useRef();

  const addNewComment = () => {
    if (newComment.trim() !== "") {
      const newComments = savedComments.concat({
        id: newID(),
        comment: newComment.trim(),
      });
      setComments(newComments);
      localStorage.setItem(uMentorsKey, JSON.stringify(newComments));
      setStatus("Comment Added");
      setNewComment("");
    } else {
      setStatus("");
    }
    textarea.current.focus();
  };

  const deleteComment = (comment) => {
    if (window.confirm("Are you sure you want to delete the comment?")) {
      const newComments = savedComments.filter((_) => _.comment !== comment);
      setComments(newComments);
      localStorage.setItem(uMentorsKey, JSON.stringify(newComments));
      setStatus("Comment deleted");
    }
  };

  const handleOnChangeNewComment = ({ target: { value } }) => {
    setNewComment(value);
    setStatus("");
  };

  const handleOnChangeComment = ({ target }) => {
    const { id, value } = target;
    const updatedComments = displayedComments.map((comment) => {
      if (comment.id === id) {
        return { id: comment.id, comment: value };
      }
      return comment;
    });
    setComments(updatedComments);
    localStorage.setItem(uMentorsKey, JSON.stringify(updatedComments));
  };

  const handleCopyComment = (comment) => {
    navigator.clipboard.writeText(comment);
    setStatus("Copied");
  };

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
    if (value.trim() !== "") {
      const filteredComment = savedComments.filter(({ comment }) =>
        comment.toLowerCase().includes(value.toLowerCase())
      );
      setComments(filteredComment);
    } else {
      setComments(savedComments);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setComments(savedComments);
    searchInput.current.focus();
  };

  return (
    <div className="container py-5 white-bg">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">New comment</label>
        <textarea
          ref={textarea}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Write a new comment here and click 'Save'"
          value={newComment}
          onChange={handleOnChangeNewComment}
        />
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary mt-2 px-5"
            onClick={addNewComment}
          >
            Save
          </button>
        </div>
        <div className="d-flex justify-content-center my-3 text-center">
          <p className="status-msg">{status}</p>
        </div>

        <div className="p-2 d-flex flex-row">
          <div className="align-self-center">
            <p>
              <strong>
                Comments{search.trim() !== "" && " found"}:{" "}
                {displayedComments.length}
              </strong>
            </p>
          </div>
          <div className="align-self-center">
            <input
              ref={searchInput}
              type="text"
              className="form-control mx-3"
              placeholder="Search in your comments.."
              value={search}
              onChange={handleSearch}
              autoFocus
            />
          </div>
          <div className="ml-4 align-self-center">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleClearSearch}
            >
              clear
            </button>
          </div>
        </div>

        {displayedComments.map(({ id, comment }) => {
          return (
            <div key={id} className="row">
              <div className="col-10">
                <textarea
                  id={id}
                  className="comment p-3"
                  value={comment}
                  onChange={handleOnChangeComment}
                />
              </div>
              <div className="col-2 flex-row align-items-center buttons">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary align-middle m-1 px-2"
                  onClick={() => handleCopyComment(comment)}
                >
                  Copy
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger align-middle m-1 px-2"
                  onClick={() => deleteComment(comment)}
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const newID = (length = 7) =>
  Math.random()
    .toString(36)
    .substr(-1 * length);
