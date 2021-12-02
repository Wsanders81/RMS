import UserDatePicker from './UserDatePicker';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { groupSales, dailySales } from '../helpers/groupSales';
import { getSales } from '../actions/actions';
import '../styles/Sales.css'
export default function Sales() {
	const [ begDate, setBegDate ] = useState({ begDate: new Date() });
	const [ endDate, setEndDate ] = useState({ endDate: new Date() });
	const [ sales, setSales ] = useState(null);
	const [ daySales, setDaySales ] = useState(null);
	const token = useSelector((store) => store.userReducer.token);
	const handleChange = (e) => {
		if (e.target.name === 'begDate') {
			setBegDate((prevState) => ({
				...prevState,
				[e.target.name]: e.target.value
			}));
		}
		else {
			setEndDate((prevState) => ({
				...prevState,
				[e.target.name]: e.target.value
			}));
		}
	};
	const handleSubmit = async () => {
		const response = await getSales(
			token,
			begDate.begDate,
			endDate.endDate
		);

		const groupedSales = groupSales(response.sales);
		const getDailySales = dailySales(response.sales);
		setSales(groupedSales);
		setDaySales(getDailySales);
	};
	const totalSales = `Total Sales ${moment(begDate.begDate).format(
		'MM-DD-YYYY'
	)} to ${moment(endDate.endDate).format('MM-DD-YYYY')}`;
	const displaySales = (
		<Box sx={{ paddingLeft: '1rem' }}>
			<Box>
				<Typography align="left" variant="h5">
					{totalSales}
				</Typography>
				<Box sx={{ display: 'flex' }}>
					<h3>Food Sales : </h3>
					<h3>{sales ? sales.foodSales : null}</h3>
				</Box>
			</Box>
			<Box>
				<Box sx={{ display: 'flex' }}>
					<h3>Alcohol Sales : </h3>
					<h3>{sales ? sales.alcoholSales : null}</h3>
				</Box>
			</Box>
			<Box>
				<Box sx={{ display: 'flex' }}>
					<h3>Beer Sales : </h3>
					<h3>{sales ? sales.beerSales : null}</h3>
				</Box>
			</Box>
			<Box>
				<Box sx={{ display: 'flex' }}>
					<h3>NA Bev Sales : </h3>
					<h3>{sales ? sales.NAbevSales : null}</h3>
				</Box>
			</Box>
		</Box>
	);
	const displayDailySales = (
		<Box>
			<Typography>Daily Breakdown</Typography>
			{daySales ? (
				daySales.map(day => {
					return (
						<Box>
							<h5>{moment(day[0]).format("ddd MMM DD YYYY") }</h5>
							<p>{day[1].food ? <p>Food Sales: {day[1].food}</p> : null}</p>
							<p>{day[1].alcohol ? <p>Alcohol Sales: {day[1].alcohol}</p> : null}</p>
							<p>{day[1].beer ? <p>Beer Sales: {day[1].beer}</p> : null}</p>
							<p>{day[1].alcohol ? <p>Alcohol Sales: {day[1].alcohol}</p> : null}</p>
						</Box>
					);
				})
			) : null}
		</Box>
	);

	return (
		<Box className="Sales">
			<Box>
				<h3>Sales</h3>
				<p>current dates with sales: 11/7 - 11/9</p>
				<UserDatePicker
					begDate={begDate}
					endDate={endDate}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
				{sales ? displaySales : null}
				{daySales ? displayDailySales : null}
			</Box>
		</Box>
	);
}
