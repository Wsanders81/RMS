
import '../styles/Navbar.css'
import {
    Box, 
    Typography, 
    AppBar, 
    Toolbar} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'    
export default function UserNavbar({toggleModal, toggleModalTwo}) {
    const user = useSelector(store => store.userReducer.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        dispatch({type:"LOGOUT"})
       
        navigate('/')
    }
    const loginButtons =
        <> 
        <Typography onClick={toggleModal} sx={{marginRight:"1rem"}} className="Navbar-link">
            Login
        </Typography>
        
        <Typography onClick={toggleModalTwo} className="Navbar-link">
            Register
        </Typography>
        </>
    const logoutButtons = 
        <Typography onClick={logout}  className="Navbar-link">
            Logout
        </Typography>
   
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar >
                <Typography className="Navbar-link" onClick={()=> navigate("/")} align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    RMS
                </Typography >
                    { user ? logoutButtons : loginButtons }
                </Toolbar>
            </AppBar>
        </Box>
    )}
    