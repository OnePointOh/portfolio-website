// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProjectProvider } from './ProjectContext';
import ProjectPage from './components/ProjectPage';
import Landing from './components/Landing'
import { TagsProvider } from './TagContext';

const App = () => {
  return (
    <Router>
      <ProjectProvider>
        <TagsProvider>
          <Routes>
            <Route path="/" exact element={<Landing/>}/>
            <Route path="/project/:title" element={<ProjectPage/>} />
          </Routes>
        </TagsProvider>
      </ProjectProvider>
    </Router>
  );
};

export default App;
