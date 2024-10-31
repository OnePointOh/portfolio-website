import React from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../ProjectContext';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 3/4,
  height: 3/4,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  alignContent: "center"
};

const ProjectPage = ({title, open, handleClose}) => {
  const projects = useProjects();
  const project = projects[title];
  var description_text;
  var tags_text;

  if (!project) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Project not found
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Project title [{title}] does not match any titles in internal project list
            {console.log(projects)}
          </Typography>
        </Box>
      </Modal>
    );
  }

  if (project.tags){
    tags_text = (<>
      <Typography id="modal-modal-description" variant='h5' marginX={5}>
        Tags
      </Typography>
      <Typography id="modal-modal-description" paragraph={true} marginX={5}>
        {project.tags.toString()}
      </Typography>
    </>)
  }

  if (project.description){
    description_text = (<>
      <Typography id="modal-modal-description" variant='h5' marginX={5}>
        Description
      </Typography>
      <Typography id="modal-modal-description" paragraph={true} marginX={5}>
        {project.description}
      </Typography>
    </>)
  }

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2" paddingBottom={2}>
              {project.display_title}
            </Typography>
            <hr></hr>
          <Box sx={{mt: 4, width: 8/10, height: 8/10, overflow: "auto", margin:"auto"}}>
            {tags_text}
            {description_text}
          </Box>
        </Box>
      </Modal>
    );
};

export default ProjectPage;
