
import '../styles/Navbar.css'
import {
    Box, 
    Typography, 
    AppBar, 
    Button,
    Toolbar} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'    
export default function UserNavbar({toggleModal, toggleModalTwo, toggleDrawer}) {
    const user = useSelector(store => store.userReducer.user)
    const navigate = useNavigate()
    
    const loginButtons =
        <Box sx={{display: "flex", justifyContent:"flex-end", flexGrow: 1}}>
        <Typography onClick={toggleModal} sx={{marginRight:"1rem"}} className="Navbar-link">
            Login
        </Typography>
        <Typography onClick={toggleModalTwo} className="Navbar-link">
            Register
        </Typography>
        </Box>
        
    const logoutButtons = 
       
        <Box sx={{display: "flex", justifyContent:"flex-end", flexGrow: 1}}>
            <FontAwesomeIcon className="Navbar-link" onClick={toggleDrawer} icon={faBars}/>
        
        </Box>
   
    return (
        <Box sx={{ flexGrow: 1 }} className="Navbar">
            <AppBar sx={{backgroundColor: "transparent"}} position="static">
                <Toolbar >
                <Typography className="Navbar-link" onClick={()=> navigate("/")} align="left" variant="h6" component="div" >
                    RMS
                </Typography >
                    { user ? logoutButtons : loginButtons }
                </Toolbar>
            </AppBar>
        </Box>
    )}
    