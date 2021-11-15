
import {Modal, Box, Typography} from '@mui/material'
import LoginForm from '../forms/LoginForm'
import RegistrationForm from '../forms/RegistrationForm'
import '../styles/LandingPage.css'

export default function LandingPage({toggleModal, open, toggleModalTwo, openTwo}){
    
    return (
      <>
       <h1>LANDING PAGE</h1> 
       <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="LandingPage-modal-login">
          <LoginForm toggle={toggleModal}/>
        </Box>
      </Modal>  
       <Modal
        open={openTwo}
        onClose={toggleModalTwo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="LandingPage-modal-register">
          <RegistrationForm toggle={toggleModalTwo}/>
        </Box>
      </Modal>  
      </> 
       )
}