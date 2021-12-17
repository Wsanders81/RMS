// import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { SET_LOCATION } from '../actions/types';
import { getSales } from '../actions/actions';
import { groupSales, currentWeekSales } from '../helpers/groupSales';
import Loader from 'react-loader-spinner';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';

import '../styles/Dashboard.css';
export default function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ loading, setLoading ] = useState(true);
	const salesRef = useRef(null);
	const groupedSalesRef = useRef(null);
	const begDateRef = useRef(null);
	const endDateRef = useRef(null);
	const weeklySales = useRef(null);
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
				begDateRef.current = formattedBegDate;
				endDateRef.current = formattedEndDate;
				const getWeeklySales = async () => {
					const res = await currentWeekSales(salesRef.current);
					
					weeklySales.current = res;
					if (weeklySales.current) setLoading(false);
				};
				getWeeklySales();
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
		<div className="container-fluid Dashboard-main">
			<div className="row">
				<div className="col-sm-12 col-lg-6 Dashboard-chart">
					<PieChart
						id="chart"
						begDate={begDateRef.current}
						endDate={endDateRef.current}
						sales={groupedSalesRef.current}
					/>
				</div>
				<div className="col-sm-12 col-lg-6 Dashboard-chart">
					<BarChart
						weeklySales={weeklySales.current}
						sales={salesRef.current}
					/>
				</div>
			</div>
		</div>
	);
}
