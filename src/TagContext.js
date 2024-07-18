import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from './ProjectContext';

const TagContext = createContext();

export const useTags = () => useContext(TagContext);

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  //const projects = useProjects();

  useEffect(() => {
    const loadTags = async () => {
      const all = {};
      // Hardcode tag categories
      all['Technical Skills'] = ['Data Science', 'Machine Learning', 'AI', 'Frontend', 'Backend', 'Web Development', 'Fullstack', 'API'];
      all['Social Skills'] = ['Leadership', 'Teamwork', 'Scrum', 'Communication'];
      all['Languages'] = ['Python', 'C++', 'Javascript', 'HTML', 'CSS', 'SQL', 'PostgreSQL', 'Ruby', 'Ruby on Rails'];
      all['Frameworks'] = ['Pytorch', 'CARLA', 'Microsoft Power BI', 'React'];
      all['Other'] = [];

      setTags(all);
    };
    
    loadTags();
    /*
    // Collect all tags into single array
    const all_tags = [];
    
    all.keys().forEach((key) => {
      all[key].forEach((tag) => {
        all_tags.push(tag.toUpperCase())
      });
    });

    // Check for missing tags in projects, add to "Other" category if not included
    projects.keys().forEach((key) => {
      if (all_tags.includes(key.toUpperCase())){
        return;
      }
      all_tags.push(key.toUpperCase());
      all['Other'].push(key);
    });

    console.log(all);
    setTags(all);
    */
  }, []);

  return (
    <TagContext.Provider value={tags}>
      {children}
    </TagContext.Provider>
  );
};
