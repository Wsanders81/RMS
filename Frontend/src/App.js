import './App.css';
import $ from 'jquery'
import UserRoutes from './components/Routes';
import Navbar from './components/Navbar'
import { CheckLocalStorage } from './helpers/checkLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {getTokenFromAPI} from './actions/actions'
import TempDrawer from './components/Drawer';
function App() {
    CheckLocalStorage()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenTwo, setIsOpenTwo] = useState(false)
    const [state, setState] = useState(false)
    

    const toggleDrawer = () =>  {
      setState(state => state = !state)
  }
    const toggleModal = () => setIsOpen(isOpen => !isOpen)
    const toggleModalTwo = () => setIsOpenTwo(isOpenTwo => !isOpenTwo)


  return (
    <div className="App">
      <Navbar toggleDrawer={toggleDrawer} toggleModal={toggleModal} toggleModalTwo={toggleModalTwo}/>
      <TempDrawer state={state} toggleDrawer={toggleDrawer}/>
      <UserRoutes 
        toggleModal={toggleModal} 
        open={isOpen}
        toggleModalTwo={toggleModalTwo}
        openTwo={isOpenTwo}
        toggleDrawer={toggleDrawer}
        state={state}/>
    </div>
  );
}

export default App;
