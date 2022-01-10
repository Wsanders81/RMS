import UserDatePicker from './UserDatePicker';
import { Box, Button, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ALERT, SET_LOCATION } from '../actions/types';
import { groupSales, dailySales } from '../helpers/groupSales';
import { getSales, addSales } from '../actions/actions';
import LineChart from './Charts/LineChart';
import SalesModal from './SalesModal';
import SalesTable from './SalesTable';
import '../styles/Sales.css';
export default function Sales() {
	const [ begDate, setBegDate ] = useState({ begDate: new Date() });
	const [ endDate, setEndDate ] = useState({ endDate: new Date() });
	const [ adminBegDate, setAdminBegDate ] = useState({ begDate: new Date() });
	const [ sales, setSales ] = useState(null);
	const [ daySales, setDaySales ] = useState(null);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ thirtyDaySales, setThirtyDaySales ] = useState(null);
	const user = useSelector((store) => store.userReducer);
	const dispatch = useDispatch();
	useEffect(
		() => {
			const setLocation = () => {
				dispatch({ type: SET_LOCATION, location: 'Sales' });
			};
			const getLast30DaysSales = async () => {
				const endDate = new Date();
				const begDate = new Date().setDate(endDate.getDate() - 15);
				const formattedBegDate = moment(begDate).format('YYYY-MM-DD');
				const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
				const res = await getSales(formattedBegDate, formattedEndDate);
				const getDailySales = dailySales(res.sales);
				setThirtyDaySales(getDailySales);
			};
			setLocation();
			getLast30DaysSales();
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

	return (
		<div className="container-lg Sales">
			<Box>
				<h3 className="Sales-page-title">Select Sales Dates</h3>
				<Box>
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
				</Box>
				<Box>
					{thirtyDaySales ? (
						<LineChart sales={thirtyDaySales} />
					) : null}
				</Box>
			</Box>
			<Box>
				{daySales ? (
					<SalesTable
						daySales={daySales}
						totalSales={sales}
						begDate={begDate.begDate}
						endDate={endDate.endDate}
					/>
				) : null}
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
		</div>
	);
}
