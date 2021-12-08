import './App.css';
import UserRoutes from './components/Routes';
import Navbar from './components/Navbar'
import { CheckLocalStorage } from './helpers/checkLocalStorage';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {toast, ToastContainer} from 'react-toastify'
import TempDrawer from './components/Drawer';
function App() {
    CheckLocalStorage()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenTwo, setIsOpenTwo] = useState(false)
    const [state, setState] = useState(false)
    const toastNotify = useSelector(store => store.toastifyReducer)
    
    useEffect(()=>{
      const toastNotification = () => {
        const notifyType = toastNotify.typeOfNotify
        const message = toastNotify.message
        const options = {
          type: notifyType === "success" ? toast.TYPE.SUCCESS : toast.TYPE.ERROR
        }
        return toast(message, options)
      }
      toastNotification()
    }, [toastNotify])

    const toggleDrawer = () =>  {
      setState(state => state = !state)
  }
    const toggleModal = () => setIsOpen(isOpen => !isOpen)
    const toggleModalTwo = () => setIsOpenTwo(isOpenTwo => !isOpenTwo)


  return (
    <div className="App">
      <Navbar toggleDrawer={toggleDrawer} toggleModal={toggleModal} toggleModalTwo={toggleModalTwo}/>
      <TempDrawer state={state} toggleDrawer={toggleDrawer}/>
      <ToastContainer position="top-left" />
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
