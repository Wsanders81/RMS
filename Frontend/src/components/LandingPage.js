import { Modal, Box, Button, Typography, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import RegistrationForm from '../forms/RegistrationForm';
import { getTokenFromAPI } from '../actions/actions';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOCATION } from '../actions/types';
import '../styles/LandingPage.css';
import Analytics from '../assets/svgs/Analytics team_Monochromatic.svg';
import TeamBuilding from '../assets/svgs/Team building _Monochromatic.svg';
import TeamMeeting from '../assets/svgs/Team meeting_Monochromatic.svg';
import Startup from '../assets/svgs/Startup_Two Color.svg';
import Github from '../assets/svgs/github-icon.svg';
import LinkedIn from '../assets/svgs/linkedin-icon.svg';
import Portfolio from '../assets/svgs/domain-registration-website-svgrepo-com.svg';
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
	const linkedInURL = 'https://www.linkedin.com/in/williamsanders81/';
	const portfolioURL = 'https://www.willsanders.dev';
	const githubRepoURL = 'https://github.com/Wsanders81/RMS';
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
		<div className="container LandingPage-container ">
			<div className="row LandingPage-row ">
				<div className="col-md-6 col-sm-12 LandingPage-text-container">
					<div className="LandingPage-text">
						Collaborate with your managers using real time data
						visualization tools
					</div>
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img
						data-aos="fade-left"
						data-aos-duration="1000"
						src={Analytics}
						alt="Analytics"
					/>
				</div>
			</div>
			<div className="row LandingPage-row ">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img
						data-aos="fade-right"
						data-aos-duration="1000"
						src={TeamBuilding}
						alt="Team Building"
					/>
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text-container">
					<div className="LandingPage-text">
						Keep track of sales, view supplier information or enter
						inventory from anywhere using your PC or mobile phone
					</div>
				</div>
			</div>
			<div className="row LandingPage-row LandingPage-bottom">
				<div className="col-md-6 col-sm-12 LandingPage-text-container">
					<div className="LandingPage-text">
						Receive up-to-date sales data to spot areas of
						opportunity or track current sales trends.
					</div>
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img
						data-aos="fade-left"
						data-aos-duration="1000"
						src={TeamMeeting}
						alt="Analytics"
					/>
				</div>
			</div>

			<div className="row LandingPage-row ">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img
						data-aos="fade-right"
						data-aos-duration="1000"
						src={Startup}
						alt="Team Building"
					/>
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text-container">
					<div className="LandingPage-text">
						Each restaurant has their own private data allowing you
						to store all the data your business needs in a secure
						location.
					</div>
				</div>
			</div>
		</div>
	);
	const smDisplay = (
		<div className="container-fluid">
			<div className="row LandingPage-row">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img
						data-aos="fade-left"
						data-aos-duration="1000"
						src={Analytics}
						alt="Analytics"
					/>
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text-container">
					<div className="LandingPage-text">
						Collaborate with your managers using real time data
						visualization tools
					</div>
				</div>
			</div>
			<div className="row LandingPage-row ">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img
						data-aos="fade-right"
						data-aos-duration="1000"
						src={TeamBuilding}
						alt="Team Building"
					/>
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text-container">
					<div className="LandingPage-text">
						Keep track of sales, view supplier information or enter
						inventory from anywhere using your PC or mobile phone
					</div>
				</div>
			</div>
			<div className="row LandingPage-row LandingPage-bottom">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img
						data-aos="fade-left"
						data-aos-duration="1000"
						src={TeamMeeting}
						alt="Analytics"
					/>
				</div>
				<div className="col-md-6 col-sm-12 LandingPage-text-container">
					<div className="LandingPage-text">
						Receive up-to-date sales data to spot areas of
						opportunity or track current sales trends.
					</div>
				</div>
			</div>
			<div className="row LandingPage-row ">
				<div className="col-md-6 col-sm-12 LandingPage-img">
					<img
						data-aos="fade-right"
						data-aos-duration="1000"
						src={Startup}
						alt="Team Building"
					/>
				</div>
				<div className="col-md-6 col-sm-12 pb-5 LandingPage-text-container">
					<div className="LandingPage-text">
						Each restaurant has their own private data allowing you
						to store all the data your business needs in a secure
						location.
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<Fragment>
			<div className="container-fluid LandingPage-hero">
				<div className="row LandingPage-hero-img" />
				<div className="LandingPage-title-text-container">
					<Typography variant="h3" className="LandingPage-title-text">
						Restaurant Management Services
					</Typography>
				</div>
			</div>
			<div className="container-lg m-auto LandingPage">
				{!user ? (
					<Button
						id="LandingPage-demo-button"
						variant="contained"
						onClick={handleClick}
					>
						Demo User
					</Button>
				) : null}

				<h2 className="LandingPage-offer-text" variant="h4">
					What We Offer{' '}
				</h2>
				{window.screen.width >= 768 ? lgDisplay : smDisplay}

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
			<div className="Navbar-footer">
				<div className="row LandingPage-social">
					<div className="col">
						<Tooltip title="Github Repo">
							<img
								onClick={() =>
									(window.location = githubRepoURL)}
								id="LandingPage-social"
								src={Github}
								alt="github"
							/>
						</Tooltip>
					</div>
					<div className="col">
						<Tooltip title="LinkedIn">
							<img
								onClick={() => (window.location = linkedInURL)}
								id="LandingPage-social"
								src={LinkedIn}
								alt="github"
							/>
						</Tooltip>
					</div>
					<div className="col">
						<Tooltip title="Portfolio Website">
							<img
								onClick={() => (window.location = portfolioURL)}
								id="LandingPage-social"
								src={Portfolio}
								alt="portfolio"
							/>
						</Tooltip>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
