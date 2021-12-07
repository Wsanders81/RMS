import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_LOCATION } from '../actions/types';
export default function POS() {
	const dispatch = useDispatch();
	useEffect(() => {
		const setLocation = () => {
			dispatch({ type: SET_LOCATION, location: 'POS' });
		};
		setLocation();
	}, []);

	return (
		<div>
			<h1>POS</h1>
		</div>
	);
}
