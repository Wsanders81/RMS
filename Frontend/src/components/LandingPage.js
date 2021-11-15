
import {Modal, Box, Typography} from '@mui/material'
import LoginForm from '../forms/LoginForm'
import '../styles/LandingPage.css'

export default function LandingPage({toggleModal, open}){

    
    return (
      <>
       <h1>LANDING PAGE</h1> 
       <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="LandingPage-modal">
          <LoginForm/>
        </Box>
      </Modal>  
      </> 
       )
}