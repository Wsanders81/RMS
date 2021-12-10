import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { SET_LOCATION } from '../actions/types';
import { getSales } from '../actions/actions';
import { groupSales } from '../helpers/groupSales';
import Loader from 'react-loader-spinner';
import PieChart from './Charts/PieChart';
export default function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ loading, setLoading ] = useState(true);
	const salesRef = useRef(null);
	const groupedSalesRef = useRef(null);
	useEffect(
		() => {
			const getSalesLast30Days = async () => {
				const endDate = new Date();
				const begDate = new Date().setDate(endDate.getDate() - 30);
				const formattedBegDate = moment(begDate).format('YYYY-MM-DD');
				const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
				const sales = await getSales(
					formattedBegDate,
					formattedEndDate
				);
				const groupedSales = groupSales(sales.sales);
				groupedSalesRef.current = groupedSales;
				salesRef.current = sales;
				setLoading(false);
			};
			const setLocation = () => {
				dispatch({ type: SET_LOCATION, location: 'Dashboard' });
			};
			getSalesLast30Days();
			setLocation();
		},
		[ navigate, dispatch ]
	);
	if (loading) {
		return (
			<Loader
				style={{ transform: 'translateY(300%)' }}
				type="Puff"
				color="#00BFFF"
				height={100}
				width={100}
			/>
		);
	}

	return (
		<Box sx={{ paddingTop: '5rem' }}>
			<h1> Dashboard </h1>
			<PieChart sales={groupedSalesRef.current} />
		</Box>
	);
}
