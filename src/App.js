import React, { useState } from 'react';
import './App.css';
import CommentsTab from './Components/CommentsTab';

function App() {
  const [tab, setTab] = useState('Comments');

  return (
    <div className="container mb-5">
      <div className="text-center">
        <img className="d-block mx-auto mb-4" src="/img/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h2>U mentors</h2>
      </div>

      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a className={`nav-link px-5 ${tab === 'Comments' ? 'active' : ''}`} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"
            onClick={() => setTab('Comments')}>Comments</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className={`nav-link px-5 ${tab === 'Statements' ? 'active' : ''}`} id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"
            onClick={() => setTab('Statements')}>Statements</a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className={`tab-pane ${tab === 'Comments' ? 'fade show active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
          <CommentsTab />
        </div>
        <div className={`tab-pane ${tab === 'Statements' ? 'fade show active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">222.</div>
      </div>

    </div>
  );
}

export default App;
