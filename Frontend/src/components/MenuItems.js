import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {SET_LOCATION} from '../actions/types'
export default function MenuItems() {
	const dispatch = useDispatch();
	useEffect(() => {
		const setLocation = () => {
			dispatch({ type: SET_LOCATION, location: 'Menu Items' });
		};
		setLocation();
	}, []);

	return (
		<div>
			<h1>Orders</h1>
		</div>
	);
}
