import './App.css';
import UserRoutes from './components/Routes';
import Navbar from './components/Navbar';
import { CheckLocalStorage } from './helpers/checkLocalStorage';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TempDrawer from './components/Drawer';
function App() {
	CheckLocalStorage();

	const drawerState = useSelector((store) => store.locationReducer.open);
	const toastNotify = useSelector((store) => store.toastifyReducer);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ isOpenTwo, setIsOpenTwo ] = useState(false);
	const [ drawerOpen, setDrawerOpen ] = useState(drawerState);
	useEffect(
		() => {
			const toastNotification = () => {
				const notifyType = toastNotify.typeOfNotify;
				const message = toastNotify.message;
				const options = {
					type :
						notifyType === 'success'
							? toast.TYPE.SUCCESS
							: toast.TYPE.ERROR
				};
				return toast(message, options);
			};

			toastNotification();
		},
		[ toastNotify ]
	);

	const toggleDrawer = () => {
		setDrawerOpen((state) => !state);
	};
	const toggleModal = () => setIsOpen((isOpen) => !isOpen);
	const toggleModalTwo = () => setIsOpenTwo((isOpenTwo) => !isOpenTwo);

	return (
		<div className="App">
			<Navbar
				toggleDrawer={toggleDrawer}
				toggleModal={toggleModal}
				toggleModalTwo={toggleModalTwo}
			/>
			<TempDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
			<ToastContainer position="top-left" autoClose={1500} />
			<UserRoutes
				toggleModal={toggleModal}
				open={isOpen}
				toggleModalTwo={toggleModalTwo}
				openTwo={isOpenTwo}
				toggleDrawer={toggleDrawer}
				state={drawerOpen}
			/>
		</div>
	);
}

export default App;
