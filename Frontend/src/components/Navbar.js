import '../styles/Navbar.css';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function UserNavbar({
	toggleModal,
	toggleModalTwo,
	toggleDrawer
}) {
	const user = useSelector((store) => store.userReducer.user);
	const restName = useSelector((store) => store.userReducer.restaurantName);
	const location = useSelector((store) => store.locationReducer.location);
	const navigate = useNavigate();

	const loginButtons = (
		<Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
			<Typography
				onClick={toggleModal}
				sx={{ marginRight: '1rem', fontFamily: 'Montserrat' }}
				className="Navbar-link"
			>
				Login
			</Typography>
			<Typography
				sx={{ fontFamily: 'Montserrat' }}
				onClick={toggleModalTwo}
				className="Navbar-link"
			>
				Register
			</Typography>
		</Box>
	);

	const logoutButtons = (
		<Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
			<FontAwesomeIcon
				className="Navbar-link"
				onClick={toggleDrawer}
				icon={faBars}
			/>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }} className="Navbar">
			<AppBar sx={{ backgroundColor: 'transparent' }} position="static">
				<div className="container">
					<Toolbar>
						<Typography
							sx={{ fontFamily: 'Montserrat', fontWeight: '600' }}
							className="Navbar-link"
							onClick={() => navigate('/')}
							align="left"
							variant="h6"
							component="div"
						>
							RMS {restName ? `- ${restName}` : null}
						</Typography>
						<Typography
							sx={{ fontFamily: 'Montserrat' }}
							className="Navbar-location"
						>
							{location}
						</Typography>
						{user ? logoutButtons : loginButtons}
					</Toolbar>
				</div>
			</AppBar>
		</Box>
	);
}
