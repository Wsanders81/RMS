import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_LOCATION } from '../actions/types';
import { Box } from '@mui/material';
import '../styles/Orders.css';
export default function Orders() {
	const dispatch = useDispatch();
	useEffect(() => {
		const setLocation = () => {
			dispatch({ type: SET_LOCATION, location: 'Orders' });
		};
		setLocation();
	}, [dispatch]);

	return (
		<Box className="Orders">
			<h1>Orders</h1>
		</Box>
	);
}
