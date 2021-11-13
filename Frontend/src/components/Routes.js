import { Routes, Route } from 'react-router-dom'
import FourOhFour from './FourOhFour'
export default function UserRoutes(){


    return (
        <Routes>
            <Route path="*" element={<FourOhFour/>}/>
            <Route path="/" element={ <h1>HOME</h1> }/>
            <Route path="/dashboard" element={ <h1>DASHBOARD</h1> }/>
        </Routes>
    )
}