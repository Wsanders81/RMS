
import {Modal, Box, Typography, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../forms/LoginForm'
import RegistrationForm from '../forms/RegistrationForm'
import { getTokenFromAPI } from '../actions/actions'
import {useDispatch} from 'react-redux'
import '../styles/LandingPage.css'

export default function LandingPage({toggleModal, open, toggleModalTwo, openTwo}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = async function(){
      const token = await dispatch(getTokenFromAPI("testuser", "password"))
      navigate("/dashboard")
      console.log("click", token)
    }
    return (
      <Box sx={{paddingTop: '5rem'}}>
       <h1>LANDING PAGE</h1>
       <Button variant="contained" onClick={()=>navigate("/dashboard")}>Dashboard</Button> 
       <Button variant="contained" onClick={handleClick}>Demo User</Button>
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
      </Box> 
       )
}