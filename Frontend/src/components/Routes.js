import { Routes, Route } from 'react-router-dom'
import FourOhFour from './FourOhFour'
import { useSelector } from 'react-redux'
import LandingPage from './LandingPage'
export default function UserRoutes({toggleModal, open, toggleModalTwo, openTwo}){
    const token = useSelector(store => store.userReducer.token)
    


    return (
        <Routes>
            <Route path="*" element={<FourOhFour/>}/>
            <Route path="/" element={ <LandingPage toggleModal={toggleModal} open={open} toggleModalTwo={toggleModalTwo} openTwo={openTwo}/> }/>
            <Route path="/dashboard" element={ <h1>DASHBOARD</h1> }/>
        </Routes>
    )
}