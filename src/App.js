import React, { useState } from "react";
import "./App.css";
import CommentsTab from "./Components/CommentsTab";
import StatementsTab from "./Components/StatementsTab";

function App() {
  const [tab, setTab] = useState("Comments");

  return (
    <div className="container mb-5">
      <div className="text-center my-5">
        <h2>U mentors</h2>
        <p>
          Save your common comments, and see your monthly statements in a simple
          chart
        </p>
      </div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <span
            className={`nav-link px-5 ${tab === "Comments" ? "active" : ""}`}
            id="comments-tab"
            data-toggle="tab"
            data-target="#Comments"
            role="tab"
            aria-controls="comments"
            aria-selected="false"
            onClick={() => setTab("Comments")}
          >
            Comments
          </span>
        </li>
        <li className="nav-item" role="presentation">
          <span
            className={`nav-link px-5 ${tab === "Statements" ? "active" : ""}`}
            id="statements-tab"
            data-toggle="tab"
            data-target="#statements"
            role="tab"
            aria-controls="statements"
            aria-selected="true"
            onClick={() => setTab("Statements")}
          >
            Statements
          </span>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className={`tab-pane ${tab === "Comments" ? "fade show active" : ""}`}
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <CommentsTab />
        </div>
        <div
          className={`tab-pane ${
            tab === "Statements" ? "fade show active" : ""
          }`}
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <StatementsTab />
        </div>
      </div>
      <footer className="mastfoot my-5 text-center">
        <div className="inner">
          <p>
            <a href="https://github.com/iHani/u-mentors">
              <i className="fab fa-github fa-lg mx-2"></i>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
