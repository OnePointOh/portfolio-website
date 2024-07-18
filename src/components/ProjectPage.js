import React from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../ProjectContext';

const ProjectPage = () => {
  const { title } = useParams();
  const projects = useProjects();
  console.log(projects)
  const project = projects[title];

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectPage;
