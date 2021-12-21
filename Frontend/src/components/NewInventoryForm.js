import { useState, useEffect, Fragment } from 'react';
import { getProductsForInventory } from '../actions/actions';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, Tabs, Tab, Modal } from '@mui/material';
import { addInventory } from '../actions/actions';
import InventoryCategory from './InventoryCategory';
import InventoryModal from './InventoryModal';
import SalesForm from '../forms/SalesForm';
import { ALERT } from '../actions/types';
import Loader from 'react-loader-spinner';

const INV_INITIAL_STATE = {
	Food      : '',
	Alcohol   : '',
	Beer      : '',
	NABev     : '',
	Sales     : {
		Food    : '',
		Alcohol : '',
		Beer    : '',
		NABev   : ''
	},
	Purchases : {
		Food    : '',
		Alcohol : '',
		Beer    : '',
		NABev   : ''
	},
	BegInv    : {
		Food    : '',
		Alcohol : '',
		Beer    : '',
		NABev   : ''
	}
};
const SUBMIT_INITIAL_STATE = {
	Food      : false,
	Alcohol   : false,
	Beer      : false,
	NABev     : false,
	Sales     : false,
	Purchases : false,
	BegInv    : false
};
function NewInventoryForm({ toggle, date, setInv, toggleInvButtons }) {
	const [ submitted, setSubmitted ] = useState(SUBMIT_INITIAL_STATE);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ products, setProducts ] = useState(null);
	const [ value, setValue ] = useState(0);
	const [ invVals, setInvVals ] = useState(INV_INITIAL_STATE);
	const dispatch = useDispatch();
	useEffect(() => {
		const getAllProducts = async () => {
			const res = await getProductsForInventory();
			setProducts(res);
			setIsLoading(false);
		};
		getAllProducts();
	}, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleSubmit = (e, category, values, salesDate, value) => {
		e.preventDefault();
		setInvVals((state) => {
			state[category] = values;
			return state;
		});
		setSubmitted((state) => {
			state[category] = true;
			return state;
		});

		if (value < 6) {
			setValue(value + 1);
		}
		setProducts((state) => {
			return { ...state };
		});
	};
	const toggleModal = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	const submitInventory = async () => {
		const res = await addInventory(invVals, date);
		if (res.message) {
			dispatch({
				type         : ALERT,
				typeOfNotify : 'error',
				message      : 'Cannot Enter Duplicate Dates'
			});
			return;
		}
		if (res === 'error') {
			dispatch({
				type         : ALERT,
				typeOfNotify : 'error',
				message      : 'Please submit all categories'
			});
			return;
		}
		dispatch({
			type         : ALERT,
			typeOfNotify : 'success',
			message      : 'Your inventory was successfully posted'
		});
		await setSubmitted(SUBMIT_INITIAL_STATE);
		setInv(res);
		toggleInvButtons();
		const reset = false;
		toggle(reset);
	};
	const handleUnsubmit = (category) => {
		setSubmitted((state) => {
			state[category] = false;
			return state;
		});
		setProducts((state) => {
			return { ...state };
		});
	};

	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<Box
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</Box>
		);
	}
	function a11yProps(index) {
		return {
			id              : `simple-tab-${index}`,
			'aria-controls' : `simple-tabpanel-${index}`
		};
	}
	if (isLoading) {
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
		<Fragment>
			<Box sx={{ width: '100%' }} className="Inventories-tabs">
				<Button variant="outlined" onClick={toggle} color="error">
					Go Back
				</Button>
				<Button
					sx={{ marginLeft: '1rem' }}
					variant="contained"
					onClick={toggleModal}
				>
					Submit Inventory
				</Button>
				<Box
					sx={{
						borderBottom : 1,
						borderColor  : 'divider',
						marginTop    : '1rem'
					}}
				>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="Inventory Categories"
						variant="scrollable"
						scrollButtons
						allowScrollButtonsMobile
					>
						<Tab label="Food" {...a11yProps(0)} />
						<Tab label="Alcohol" {...a11yProps(1)} />
						<Tab label="Beer" {...a11yProps(2)} />
						<Tab label="NA Bev" {...a11yProps(3)} />
						<Tab label="Sales" {...a11yProps(4)} />
						<Tab label="Purchases" {...a11yProps(5)} />
						<Tab label="Beginning Inventory" {...a11yProps(6)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<InventoryCategory
						unsubmit={handleUnsubmit}
						submitted={submitted}
						inVals={invVals}
						category={'Food'}
						products={products.products.food}
						submit={handleSubmit}
						value={value}
					/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<InventoryCategory
						unsubmit={handleUnsubmit}
						submitted={submitted}
						inVals={invVals}
						category={'Alcohol'}
						products={products.products.alcohol}
						submit={handleSubmit}
						value={value}
					/>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<InventoryCategory
						unsubmit={handleUnsubmit}
						submitted={submitted}
						inVals={invVals}
						category={'Beer'}
						products={products.products.beer}
						submit={handleSubmit}
						value={value}
					/>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<InventoryCategory
						unsubmit={handleUnsubmit}
						submitted={submitted}
						invVals={invVals}
						category={'NABev'}
						products={products.products.NABev}
						submit={handleSubmit}
						value={value}
					/>
				</TabPanel>
				<TabPanel value={value} index={4}>
					<SalesForm
						unsubmit={handleUnsubmit}
						submitted={submitted}
						category={'Sales'}
						submit={handleSubmit}
						value={value}
						invVals={invVals.Sales}
					/>
				</TabPanel>
				<TabPanel value={value} index={5}>
					<SalesForm
						unsubmit={handleUnsubmit}
						submitted={submitted}
						category={'Purchases'}
						submit={handleSubmit}
						value={value}
						invVals={invVals.Purchases}
					/>
				</TabPanel>
				<TabPanel value={value} index={6}>
					<SalesForm
						unsubmit={handleUnsubmit}
						submitted={submitted}
						category={'BegInv'}
						submit={handleSubmit}
						value={value}
						invVals={invVals.BegInv}
					/>
				</TabPanel>
			</Box>
			<Modal
				open={isOpen}
				onClose={toggleModal}
				aria-labelledby="modal-Register"
				aria-describedby="modal-Register"
			>
				<InventoryModal
					message={'Are you sure you want to submit?'}
					buttonText={'Submit'}
					color={'success'}
					submit={submitInventory}
				/>
			</Modal>
		</Fragment>
	);
}
export default NewInventoryForm;
