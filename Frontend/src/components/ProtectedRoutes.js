import {  Navigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
export default function PrivateRoute({ children }) {
	const user = useSelector((store) => store.userReducer);
	const dispatch = useDispatch();
	const useAuth = () => {
		return user.user ? true : false;
	};
	const auth = useAuth();
	useEffect(()=> {
		if (!auth)
		dispatch({
			type: 'ALERT',
			typeOfNotify: 'error',
			message: 'Unauthorized'
		});
	}, [dispatch, auth])
	
	return auth ? children : <Navigate to="/" />;
}
