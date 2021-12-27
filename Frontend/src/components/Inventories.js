import { Box, Button, Paper, Typography } from '@mui/material';
import '../styles/Inventories.css';
import { useState, useEffect, Fragment } from 'react';
import UserDatePicker from './UserDatePicker';
import {
	getAllInventories,
	getInventory,
	deleteInventory
} from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ALERT, SET_LOCATION } from '../actions/types';
import NewInventoryForm from './NewInventoryForm';
import InventoryTable from './InventoryTable';
import Loader from 'react-loader-spinner';

export default function Inventories() {
	const invStates = useSelector((store) => store.viewReducer);
	const [ showDates, setShowDates ] = useState(false);
	const [ begDate, setBegDate ] = useState({ begDate: new Date() });
	const [ endDate, setEndDate ] = useState({ endDate: new Date() });
	const [ inventories, setInventories ] = useState(null);
	const [ selectedInv, setSelectedInv ] = useState(null);
	const [ showInvForm, setShowInvForm ] = useState(invStates.showInvForm);
	const [ showInvButtons, setShowInvButtons ] = useState(
		invStates.showInvButtons
	);
	const [ loading, setLoading ] = useState(true);

	const dispatch = useDispatch();
	useEffect(
		() => {
			const setLocation = () => {
				dispatch({ type: SET_LOCATION, location: 'Inventory' });
			};
			const getInventoriesToDisplay = async () => {
				const endDate = new Date();
				const begDate = new Date().setDate(endDate.getDate() - 30);
				const formattedBegDate = moment(begDate).format('YYYY-MM-DD');
				const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
				const displayInventories = await getAllInventories(
					formattedBegDate,
					formattedEndDate
				);

				setInventories(displayInventories);
				if (displayInventories) setLoading(false);
			};

			getInventoriesToDisplay();
			setLocation();
		},
		[ dispatch, selectedInv, invStates ]
	);
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
		const res = await getAllInventories(begDate.begDate, endDate.endDate);

		setInventories(res);
	};

	const toggleDatePicker = () => {
		setShowDates((prevState) => !prevState);
		if (selectedInv) {
			setSelectedInv(null);
			// setInventories(null);
		}
		toggleInvButtons();
	};
	const toggleInvButtons = () => {
		setShowInvButtons((state) => !state);
	};

	const toggleInvForm = (reset) => {
		setShowInvForm((prevState) => !prevState);
		toggleInvButtons();
		// setInventories(null);
		if (reset === false) {
			return;
		}
		else {
			setSelectedInv(null);
		}
	};
	const handleSelect = async (id) => {
		const res = await getInventory(id);

		setSelectedInv(res);
		toggleDatePicker();
		toggleInvButtons();
	};
	const handleDelete = async () => {
		const res = await deleteInventory(selectedInv.inventory.id);
		if (res === 'Inventory successfully deleted') {
			setSelectedInv(null);
			toggleDatePicker();
			toggleInvButtons();
			dispatch({
				type         : ALERT,
				typeOfNotify : 'success',
				message      : 'Inventory successfully deleted'
			});
		}
	};

	const inventoryButtons = (
		<Box
			sx={{
				transform     : 'translateY(150%)',
				display       : 'flex',
				flexDirection : 'column'
			}}
		>
			<Button
				sx={{ width: '10rem', margin: 'auto' }}
				onClick={toggleDatePicker}
				variant="contained"
			>
				Select Inventory
			</Button>
			<Button
				sx={{ width: '10rem', margin: 'auto', marginTop: '2rem' }}
				onClick={toggleInvForm}
				variant="contained"
			>
				Start New Inventory
			</Button>
		</Box>
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
		<Box className="Inventories">
			{showInvForm ? (
				<Fragment>
					<UserDatePicker
						begDate={begDate}
						showSubmit={false}
						handleChange={handleChange}
						title="Please Enter Inventory Date"
					/>
				</Fragment>
			) : null}

			{showInvButtons ? inventoryButtons : null}
			{showDates ? (
				<Box>
					<UserDatePicker
						showSubmit={true}
						begDate={begDate}
						endDate={endDate}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
					<Box className="Inventories-pick">
						{inventories ? (
							inventories.map((inv) => {
								return (
									<Paper
										key={inv.id}
										onClick={() => handleSelect(inv.id)}
										className="Inventories-singleInv"
									>
										<Typography variant="h5">
											{moment(inv.date).format(
												'ddd MMM DD YY'
											)}
										</Typography>
										<Typography variant="body2">
											Food Sales: {inv.food_sales}
										</Typography>
										<Typography variant="body2">
											Beer Sales: {inv.beer_sales}
										</Typography>
										<Typography variant="body2">
											Alcohol Sales: {inv.alcohol_sales}
										</Typography>
										<Typography variant="body2">
											NA Bev Sales: {inv.na_bev_sales}
										</Typography>
									</Paper>
								);
							})
						) : null}
					</Box>
					<Button
						sx={{ marginTop: '1rem' }}
						onClick={toggleDatePicker}
						variant="outlined"
						color="error"
					>
						Go Back
					</Button>
				</Box>
			) : null}
			{selectedInv ? (
				<InventoryTable
					inventory={selectedInv}
					removeInv={handleDelete}
					setInv={setSelectedInv}
					toggleInvButtons={toggleInvButtons}
				/>
			) : null}
			{showInvForm ? (
				<NewInventoryForm
					toggleInvButtons={toggleInvButtons}
					setInv={setSelectedInv}
					date={begDate.begDate}
					toggle={toggleInvForm}
				/>
			) : null}
		</Box>
	);
}
