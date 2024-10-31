import './Landing.css';
import 'react-data-grid/lib/styles.css';

import * as React from 'react';
import { useTags } from '../TagContext';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useProjects } from '../ProjectContext';
import { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import DataGrid, { SelectColumn, textEditor } from 'react-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProjectPage from './ProjectPage';


const Title = () => {
    return (
        <svg viewBox="0 0 600 50" className="title">
            <text x="50%" y="50%" fill="white" stroke="black" strokeWidth={1.4} textAnchor="middle" dominantBaseline="middle">
                Trevor Hatch
            </text>
        </svg>
    );
}

const AboutMe = () => {
    return (
        <div className="about-me">
            <h2>About Me</h2>
            <p>
            As a dedicated and highly motivated computer science 
            student at Texas A&M University, specializing in data 
            science and AI, I am passionate about leveraging 
            cutting-edge technologies to drive innovation and solve 
            complex problems. With a solid foundation in programming 
            languages such as Python, C++, and Java, I have developed 
            expertise in machine learning frameworks such as TensorFlow 
            and PyTorch, enabling me to apply advanced algorithms and 
            statistical models to extract valuable insights from data. 
            </p>
        </div>
    );
}

const AboutWebsite = () => {
  return (
      <div className="about-website">
          <h2>About this website</h2>
          <h3>Currently under development.</h3>
          <p>
              This website serves as a portfolio to showcase my projects and accomplishments. 
              You can explore my work, learn more about my skills and experiences, and search through my projects below.
          </p>
      </div>
  );
}

const ProjectPanel = () => {
    const [selected, setSelected] = useState([]);
    const projects = useProjects();

    return(
        <div>
            <TagSearch setSelected={setSelected}/>
            <ProjectGrid selected={selected} projects={projects}/>
        </div>
    );
};

const TagSearch = ({setSelected}) => {
    var all_tags = useTags();
    
    if (all_tags === undefined || all_tags.length == 0){
        console.log('no tag context')
        all_tags = {};
        // Hardcode tag categories
        all_tags['Technical Skills'] = ['Data Science', 'Machine Learning', 'AI', 'Frontend', 'Backend', 'Web Development', 'Fullstack', 'API'];
        all_tags['Social Skills'] = ['Leadership', 'Teamwork', 'Scrum', 'Communication'];
        all_tags['Languages'] = ['Python', 'C++', 'Javascript', 'HTML', 'CSS', 'SQL', 'PostgreSQL', 'Ruby', 'Ruby on Rails'];
        all_tags['Frameworks'] = ['Pytorch', 'CARLA', 'Microsoft Power BI', 'React', "AWS"];
        all_tags['Other'] = [];
    }
    console.log(all_tags)

    var flat_tags = []

    for (const group in all_tags) {
        flat_tags.push(...all_tags[group]);
    }


    const onChangeHandle = (e, val) => {
        console.log(e)
        setSelected(val)
    }
    return (

        <Autocomplete
        multiple
        id="tags-standard"
        options={flat_tags}
        groupBy={(option) => {
            for (const group in all_tags) {
                if (all_tags[group].includes(option)){
                    return group;
                }
            }
        }}
        style={{ width: "100%" }}
        onChange={onChangeHandle}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Tags"
          />
        )}
      />
        
    );
}


const ProjectGrid = ({selected, projects}) => {
    const [matched, setMatched] = useState([]);
    const columns = [
        { key: 'matches', name: 'Matches', width: 120, renderCell: MatchLabel, cellClass: 'matches_col'},
        { key: 'display_title', name: 'Project Name', width: 200, renderCell: ProjectLabel},
        { key: 'description', name: 'Description', width: 400 },
    ]

    // When selected changes, and render occurs, before rendering, update which projects to be displayed
    useLayoutEffect(() => {
        var project_matches = []; //{ ...projects };
        console.log(selected)
        console.log(projects)
        const selectedUpper = selected.map(str => str.toUpperCase());
        console.log(selected)

        if (project_matches === undefined){
            return(null);
        }
        
        for (const project_id in projects) {
            project_matches.push({ ...projects[project_id] });
            project_matches[project_matches.length - 1]['matches'] = 0;
            project_matches[project_matches.length - 1]['matchedTags'] = [];
            for (const i in projects[project_id]['tags']) {
                var tag = projects[project_id]['tags'][i]
                if (selectedUpper.includes(tag.toUpperCase())){
                    console.log(tag)
                    project_matches[project_matches.length - 1]['matches']++;
                    project_matches[project_matches.length - 1]['matchedTags'].push(tag);
              }
            };
        }

          project_matches = project_matches.sort((a, b) => b['matches'] - a['matches']);
        
          /*
          if (project_matches.length != 0){
            console.log(project_matches[project_matches.length - 1]['matchedTags'])
          }
            */
          
          setMatched(project_matches);

    }, [selected]);

    return(
        <DataGrid columns={columns} rows={matched} />
    );
};


const MatchLabel = ({ row }) => {
    var tagsArr = []
    /*
    if (row['matchedTags'] === undefined){
        return(<></>);
    }
        */
    for (const i in row['matchedTags']) {
        var tag = row['matchedTags'][i]
        console.log(tag)
        tagsArr.push(
            <Chip label={tag} color="primary"/>
        );
    }
    console.log(row['matches']);
   
    return(
        //<Chip label="Chip Outlined" variant="outlined" />
        <Tooltip placement="top" disableInteractive title={
            <>
                <Typography color="inherit">Matched Tags:</Typography>
                {tagsArr}
            </>
        }>

            <Button disableRipple>{row.matches}</Button>
        </Tooltip>
    );
};


const ProjectLabel = ({row}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        console.log('close');
        setShow(false);
    };
    const handleShow = () => {
        console.log('open');
        setShow(true);
    };
    
    return(
        <div>
            <Button variant="outlined" onClick={handleShow} sx={{textTransform: 'capitalize'}}>
                {row.display_title}
            </Button>


            
            <ProjectPage title = {row.title} open = {show} handleClose = {handleClose}/>
        </div>
    );
}


const Landing = () => {
    return (
        <div className='Landing'>
            <Title />
            <div className='row'>
                <div className='column image-column'>
                    <img src={require('../assets/profile_img.jpg')} alt='Profile' className='profile-image' />
                </div>
                <div className='column about-column'>
                    <AboutMe />
                </div>
            </div>
            <div className='row'>
                <AboutWebsite />
            </div>

            <div className='row'>
                <ProjectPanel />
            </div>

            <div className='row'>

            </div>
            
        </div>
    );
};



export default Landing;
