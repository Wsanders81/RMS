import {Box} from '@mui/material'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
export default function Dashboard() {
    const user = useSelector(store => store.userReducer.user)
    const navigate = useNavigate()
    useEffect(()=> {
        const checkUser = () => {
            if(!user){
                return navigate('/')
            }
        } 
        checkUser()
    },[navigate, user])
    
    return (
        <Box sx={{paddingTop: '5rem'}}>
            <h1> Dashboard </h1>
        </Box>
    )
}