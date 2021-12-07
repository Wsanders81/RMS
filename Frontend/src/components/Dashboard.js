import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { SET_LOCATION } from '../actions/types';

export default function Dashboard() {
	const user = useSelector((store) => store.userReducer.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(
		() => {
			const checkUser = () => {
				if (!user) {
					return navigate('/');
				}
			};
			const setLocation = () => {
				dispatch({ type: SET_LOCATION, location: 'Dashboard' });
			};
			checkUser();
			setLocation();
		},
		[ navigate, user, dispatch ]
	);

	return (
		<Box sx={{ paddingTop: '5rem' }}>
			<h1> Dashboard </h1>
		</Box>
	);
}
