import UserDatePicker from './UserDatePicker';
import { Box, Typography, Button, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ALERT, SET_LOCATION } from '../actions/types';
import { groupSales, dailySales } from '../helpers/groupSales';
import { getSales, addSales } from '../actions/actions';
import SalesModal from './SalesModal';
import '../styles/Sales.css';
export default function Sales() {
	const [ begDate, setBegDate ] = useState({ begDate: new Date() });
	const [ endDate, setEndDate ] = useState({ endDate: new Date() });
	const [ adminBegDate, setAdminBegDate ] = useState({ begDate: new Date() });
	const [ sales, setSales ] = useState(null);
	const [ daySales, setDaySales ] = useState(null);
	const [ isOpen, setIsOpen ] = useState(false);
	const user = useSelector((store) => store.userReducer);
	const dispatch = useDispatch();
	useEffect(
		() => {
			const setLocation = () => {
				dispatch({ type: SET_LOCATION, location: 'Sales' });
			};
			setLocation();
		},
		[ dispatch ]
	);

	const toggleModal = () => {
		setIsOpen((isOpen) => !isOpen);
	};
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
	const handleAdminDateChange = (e) => {
		setAdminBegDate((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}));
	};
	const handleSubmit = async () => {
		const response = await getSales(begDate.begDate, endDate.endDate);

		const groupedSales = groupSales(response.sales);
		const getDailySales = dailySales(response.sales);
		setSales(groupedSales);
		setDaySales(getDailySales);
	};
	const handleSalesSubmit = async (e, category, sales, { begDate }) => {
		const response = await addSales(sales, begDate);
		if (response[0].data.sales.error) {
			dispatch({
				type         : ALERT,
				typeOfNotify : 'error',
				message      : response[0].data.sales.error
			});
		}
		else {
			dispatch({
				type         : ALERT,
				typeOfNotify : 'success',
				message      : 'Sales have successfully been added'
			});
			toggleModal();
		}
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
				daySales.map((day) => {
					return (
						<Box key={day[0]}>
							<h5>{moment(day[0]).format('ddd MMM DD YYYY')}</h5>
							<p>
								{day[1].food ? (
									<p>Food Sales: {day[1].food}</p>
								) : null}
							</p>
							<p>
								{day[1].alcohol ? (
									<p>Alcohol Sales: {day[1].alcohol}</p>
								) : null}
							</p>
							<p>
								{day[1].beer ? (
									<p>Beer Sales: {day[1].beer}</p>
								) : null}
							</p>
							<p>
								{day[1]['NA Beverage'] ? (
									<p>NA Bev Sales: {day[1]['NA Beverage']}</p>
								) : null}
							</p>
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
					showSubmit={true}
				/>
				{user.isAdmin === 'true' ? (
					<Button onClick={toggleModal} variant="outlined">
						Add Sales
					</Button>
				) : null}

				{sales ? displaySales : null}
				{daySales ? displayDailySales : null}
			</Box>
			<Modal
				open={isOpen}
				onClose={toggleModal}
				aria-labelledby="modal-Register"
				aria-describedby="modal-Register"
			>
				<SalesModal
					handleSalesSubmit={handleSalesSubmit}
					handleChange={handleAdminDateChange}
					begDate={adminBegDate}
				/>
			</Modal>
		</Box>
	);
}
