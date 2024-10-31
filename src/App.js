// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProjectProvider } from './ProjectContext';
import ProjectPage from './components/ProjectPage';
import Landing from './components/Landing'
import { TagsProvider } from './TagContext';

const App = () => {
  return (
    <ProjectProvider>
      <TagsProvider>
        <Landing/>
      </TagsProvider>
    </ProjectProvider>
  );
};

export default App;
