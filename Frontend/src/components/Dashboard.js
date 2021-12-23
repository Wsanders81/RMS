// import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { SET_LOCATION, START_NEW_INVENTORY } from '../actions/types';
import { getSales } from '../actions/actions';
import {
	groupSales,
	currentWeekSales,
	dailySales
} from '../helpers/groupSales';
import Loader from 'react-loader-spinner';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';
import '../styles/Dashboard.css';
export default function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ loading, setLoading ] = useState(true);
	const [ thirtyDaySales, setThirtyDaySales ] = useState(null);

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
			const getLast15DaysSales = async () => {
				const endDate = new Date();
				const begDate = new Date().setDate(endDate.getDate() - 15);
				const formattedBegDate = moment(begDate).format('YYYY-MM-DD');
				const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
				const res = await getSales(formattedBegDate, formattedEndDate);
				const getDailySales = dailySales(res.sales);
				setThirtyDaySales(getDailySales);
			};
			getSalesLast30Days();
			getLast15DaysSales();
			setLocation();
		},
		[ navigate, dispatch ]
	);
	const handleNavigateClick = (e, route) => {
		if (route === '/inventory')
			dispatch({ type: START_NEW_INVENTORY, boolean: true });
		navigate(route);
	};
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
		<div className="container-lg Dashboard-main">
			<div className="container col">
				<div className="row ">
					<div className="container col-sm-12 col-lg-2 Dashboard-buttons-container">
						<div
							className="btn-group-vertical Dashboard-buttons"
							role="group"
							aria-label="navigation buttons"
						>
							<button
								type="button"
								class="btn btn-outline-success"
								onClick={(e) =>
									handleNavigateClick(e, '/sales')}
							>
								SALES
							</button>
							<button
								type="button"
								class="btn btn-outline-success"
								onClick={(e) =>
									handleNavigateClick(e, '/inventory')}
							>
								START NEW INVENTORY
							</button>
							<button
								type="button"
								class="btn btn-outline-success"
								onClick={(e) =>
									handleNavigateClick(e, '/menu-items')}
							>
								MENU ITEMS
							</button>
							<button
								type="button"
								class="btn btn-outline-success"
								onClick={(e) =>
									handleNavigateClick(e, '/suppliers')}
							>
								SUPPLIERS
							</button>
						</div>
					</div>
					<div className="col-sm-12 col-lg-5 Dashboard-chart">
						<PieChart
							id="chart"
							begDate={begDateRef.current}
							endDate={endDateRef.current}
							sales={groupedSalesRef.current}
						/>
					</div>
					<div className="col-sm-12 col-lg-5 Dashboard-chart">
						<BarChart
							weeklySales={weeklySales.current}
							sales={salesRef.current}
						/>
					</div>
				</div>
				<div className="row Dashboard-chart">
					<LineChart sales={thirtyDaySales} />
				</div>
			</div>
		</div>
	);
}
