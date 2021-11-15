import './App.css';
import $ from 'jquery'
import UserRoutes from './components/Routes';
import Navbar from './components/Navbar'

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {getTokenFromAPI} from './actions/actions'
function App() {
    
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal = () => setIsOpen(isOpen => !isOpen)
  $(document).ready(function() {
    $(window).scroll(function() {
      if($(this).scrollTop() < $("#green").height()){
         $(".navbar").removeClass("bg-dark");
      }
      else{
         $(".navbar").addClass("bg-dark");
      }
    });
  });
    const dispatch = useDispatch()
    useEffect(() => {
      const getToken = async function(username, password){
          dispatch(getTokenFromAPI(username, password))
        } 
        // getToken('testuser', 'password')
          
    }, [dispatch])

  return (
    <div className="App">
      <Navbar toggleModal={toggleModal}/>
      <UserRoutes toggleModal={toggleModal} open={isOpen}/>
    </div>
  );
}

export default App;
