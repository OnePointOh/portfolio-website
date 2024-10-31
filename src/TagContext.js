import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from './ProjectContext';

const TagContext = createContext();

export const useTags = () => useContext(TagContext);

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const projects = useProjects();

  useEffect(() => {
    const loadTags = async () => {
      const all = {};
      // Hardcode tag categories
      all['Technical Skills'] = ['Data Science', 'Machine Learning', 'AI', 'Frontend', 'Backend', 'Web Development', 'Fullstack', 'API'];
      all['Social Skills'] = ['Leadership', 'Teamwork', 'Scrum', 'Communication'];
      all['Languages'] = ['Python', 'C++', 'Javascript', 'HTML', 'CSS', 'SQL', 'PostgreSQL', 'Ruby', 'Ruby on Rails'];
      all['Frameworks'] = ['Pytorch', 'CARLA', 'Microsoft Power BI', 'React', "AWS"];
      all['Other'] = [];

      // Collect all categorized tags into a single array
      const all_tags = [];
      Object.keys(all).forEach((key) => {
        all[key].forEach((tag) => {
          all_tags.push(tag.toUpperCase());
        });
      });

      // Check for missing tags in projects, add to "Other" category if not included
      Object.keys(projects).forEach((project) => {
        projects[project].tags.forEach((tag) => {
          if (!all_tags.includes(tag.toUpperCase())) {
            console.log(tag)
            all_tags.push(tag.toUpperCase());
            all['Other'].push(tag);
          }
        });
      });

      console.log(all);
      setTags(all);
    };

    loadTags();
  }, [projects]); // Add 'projects' as a dependency

  return (
    <TagContext.Provider value={tags}>
      {children}
    </TagContext.Provider>
  );
};