import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const loadProjects = async () => {
      const context = require.context('./projects', false, /.json$/);
      const all = {};
      context.keys().forEach((key) => {
        const fileName = key.replace('./', '');
        const resource = require(`./projects/${fileName}`);
        const namespace = fileName.replace('.json', '');
        all[namespace] = JSON.parse(JSON.stringify(resource));
      
      });
      console.log(all)

      setProjects(all);
    };
    loadProjects();
  }, []);

  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};
