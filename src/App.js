import React, { useState } from "react";
import "./App.css";
import CommentsTab from "./Components/CommentsTab";
import StatementsTab from "./Components/StatementsTab";

function App() {
  const [tab, setTab] = useState("Statements");

  return (
    <div className="container mb-5">
      <div className="text-center my-5">
        <h2>U mentors</h2>
        <p>
          Save your common comments, and see your monthly statements in simple
          charts
        </p>
      </div>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link px-5 ${tab === "Comments" ? "active" : ""}`}
            id="home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="false"
            onClick={() => setTab("Comments")}
          >
            Comments
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link px-5 ${tab === "Statements" ? "active" : ""}`}
            id="profile-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="true"
            onClick={() => setTab("Statements")}
          >
            Statements
          </a>
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
    </div>
  );
}

export default App;
