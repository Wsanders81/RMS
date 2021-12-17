import { Modal, Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import RegistrationForm from '../forms/RegistrationForm';
import { getTokenFromAPI } from '../actions/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOCATION } from '../actions/types';
import { loremIpsum } from 'lorem-ipsum';
import '../styles/LandingPage.css';
import Analytics from '../assets/svgs/Analytics team_Monochromatic.svg';
import TeamBuilding from '../assets/svgs/Team building _Monochromatic.svg';
import TeamMeeting from '../assets/svgs/Team meeting_Monochromatic.svg';
import Startup from '../assets/svgs/Startup_Two Color.svg';
import HeroImage from '../assets/images/patrick-tomasso-GXXYkSwndP4-unsplash.jpg';
export default function LandingPage({
	toggleModal,
	open,
	toggleModalTwo,
	openTwo
}) {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.userReducer.user);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(
		() => {
			const setLocation = () => {
				if (window.screen.width < 768 && pathname === '/') {
					return;
				}
				dispatch({ type: SET_LOCATION, location: 'Welcome to RMS!' });
			};
			setLocation();
		},
		[ dispatch, pathname ]
	);
	const handleClick = async function() {
		const token = await dispatch(getTokenFromAPI('testuser', 'password'));
		if (token) {
			dispatch({
				type         : 'ALERT',
				typeOfNotify : 'success',
				message      : 'Welcome back Demo User!'
			});
			navigate('/dashboard');
		}
	};
	const lgDisplay = (
		<div className="container-fluid LandingPage-container">
			<div className="row LandingPage-row">
				<div className="col-md-6 col-sm-12 LandingPage-text">
					{loremIpsum({ count: '1', units: 'paragraphs' })}
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img src={Analytics} alt="Analytics" />
				</div>
			</div>
			<div className="row LandingPage-row ">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img src={TeamBuilding} alt="Team Building" />
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text">
					{loremIpsum({ count: '1', units: 'paragraphs' })}
				</div>
			</div>
			<div className="row LandingPage-row LandingPage-bottom">
				<div className="col-md-6 col-sm-12 LandingPage-text">
					{loremIpsum({ count: '1', units: 'paragraphs' })}
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img src={TeamMeeting} alt="Analytics" />
				</div>
			</div>
		</div>
	);
	const smDisplay = (
		<div className="container-fluid">
			<div className="row LandingPage-row">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img src={Analytics} alt="Analytics" />
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text">
					{loremIpsum({ count: '1', units: 'paragraphs' })}
				</div>
			</div>
			<div className="row LandingPage-row ">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img src={TeamBuilding} alt="Team Building" />
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text">
					{loremIpsum({ count: '1', units: 'paragraphs' })}
				</div>
			</div>
			<div className="row LandingPage-row LandingPage-bottom">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img src={TeamMeeting} alt="Analytics" />
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text">
					{loremIpsum({ count: '1', units: 'paragraphs' })}
				</div>
			</div>
		</div>
	);
	return (
		<div className="container-fluid LandingPage">
			{!user ? (
				<Button
					sx={{ position: 'fixed', top: 10, right: 200, zIndex: 2 }}
					id="LandingPage-demo-button"
					variant="contained"
					onClick={handleClick}
				>
					Demo User
				</Button>
			) : null}
			<div className="container-fluid LandingPage-hero">
				<div className="row LandingPage-hero-img">
					{/* <img src={HeroImage} alt="Title background" /> */}
				</div>
				<div className="LandingPage-title-text">Welcome to RMS</div>
			</div>
			{window.screen.width >= 768 ? lgDisplay : smDisplay}

			<div className="Navbar-footer">
				<Typography>Created By: Will Sanders</Typography>
			</div>
			<Modal
				open={open}
				onClose={toggleModal}
				aria-labelledby="modal-Login"
				aria-describedby="modal-Login"
			>
				<Box className="LandingPage-modal-login">
					<LoginForm toggle={toggleModal} />
				</Box>
			</Modal>
			<Modal
				open={openTwo}
				onClose={toggleModalTwo}
				aria-labelledby="modal-Register"
				aria-describedby="modal-Register"
			>
				<Box className="LandingPage-modal-register">
					<RegistrationForm toggle={toggleModalTwo} />
				</Box>
			</Modal>
		</div>
	);
}
