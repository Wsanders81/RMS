import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Tab, Tabs, Modal } from '@mui/material';
import { SET_LOCATION, ALERT } from '../actions/types';
import '../styles/MenuItems.css';
import {
	getMenuItems,
	getSuppliers,
	getAllProducts,
	createMenuItem
} from '../actions/actions';
import MenuItemTable from './MenuItemTable';
import MenuItemForm from '../forms/MenuItemForm';
import MenuItemIngredientForm from '../forms/MenuItemIngredientForm';
const NEW_ITEM_INITIAL_STATE = {
	name        : '',
	category_id : '',
	price       : '',
	ingredients : ''
};
export default function MenuItems() {
	const [ value, setValue ] = useState(0);
	const [ menuItems, setMenuItems ] = useState(null);
	const [ suppliers, setSuppliers ] = useState(null);
	const [ refresh, setRefresh ] = useState(false);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ newItem, setNewItem ] = useState(NEW_ITEM_INITIAL_STATE);
	const [ showMenuItemOne, setShowMenuItemOne ] = useState(true);
	const [ showMenuItemTwo, setShowMenuItemTwo ] = useState(false);
	const [ products, setProducts ] = useState(null);
	const [ ingredients, addIngredients ] = useState([]);

	const dispatch = useDispatch();
	const user = useSelector((store) => store.userReducer);
	useEffect(
		() => {
			const setLocation = () => {
				dispatch({ type: SET_LOCATION, location: 'Menu Items' });
			};
			const getMenu = async () => {
				const menuItems = await getMenuItems();
				setMenuItems(menuItems);
			};
			const getAllSuppliers = async function() {
				const allSuppliers = await getSuppliers();
				setSuppliers(allSuppliers.suppliers);
				allSuppliers.suppliers.map((supplier) => {
					return dispatch({ type: 'GET_SUPPLIERS', supplier });
				});
			};
			const getProducts = async function() {
				const products = await getAllProducts();
				setProducts(products);
			};
			getProducts();
			getAllSuppliers();
			setLocation();
			getMenu();
		},
		[ dispatch, refresh ]
	);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const toggleModal = () => {
		setIsOpen((open) => !open);
		if (ingredients.length)
			addIngredient((state) => {
				state.length = 0;
				return state;
			});
	};
	const toggleRefresh = () => {
		setRefresh((refresh) => !refresh);
	};
	const toggleForm = () => {
		setShowMenuItemOne((state) => !state);
	};
	const addIngredient = (values) => {
		addIngredients((state) => {
			return [
				...state,
				{
					product_id : values.product_id,
					quantity   : values.quantity
				}
			];
		});
		toggleRefresh();
	};
	const handleFirstSubmit = (values) => {
		setNewItem((state) => {
			state.name = values.name;
			state.category_id = values.category_id;
			state.price = values.price;
			return state;
		});
		setShowMenuItemOne((show) => !show);
		setShowMenuItemTwo((show) => !show);
	};

	const handleSubmitToAPI = async () => {
		newItem.ingredients = ingredients;
		const res = await createMenuItem(newItem);
		if (res.item === 'error') {
			dispatch({
				type         : ALERT,
				typeOfNotify : 'error',
				message      : 'Duplicate item name'
			});
			return;
		}
		else {
			dispatch({
				type         : ALERT,
				typeOfNotify : 'success',
				message      : 'Item successfully added'
			});
			window.location.reload();
		}
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

	return (
		<Box className="MenuItems">
			{user.isAdmin === 'true' ? (
				<Button
					sx={{ marginBottom: '1rem' }}
					variant="outlined"
					onClick={toggleModal}
				>
					Add Menu Item
				</Button>
			) : null}
			<Box
				sx={{
					borderBottom : 1,
					borderColor  : 'divider'
				}}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="Food Categories"
				>
					<Tab label="Food" {...a11yProps(0)} />
					<Tab label="Alcohol" {...a11yProps(1)} />
					<Tab label="Beer" {...a11yProps(2)} />
					<Tab label="NA Bev" {...a11yProps(3)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				{menuItems ? (
					<MenuItemTable
						items={menuItems.items.filter(
							(item) => item.category_id === 1
						)}
						suppliers={suppliers}
						category={'Food'}
						toggleRefresh={toggleRefresh}
					/>
				) : null}
			</TabPanel>
			<TabPanel value={value} index={1}>
				{menuItems ? (
					<MenuItemTable
						items={menuItems.items.filter(
							(item) => item.category_id === 2
						)}
						suppliers={suppliers}
						category={'Alcohol'}
						toggleRefresh={toggleRefresh}
					/>
				) : null}
			</TabPanel>
			<TabPanel value={value} index={2}>
				{menuItems ? (
					<MenuItemTable
						items={menuItems.items.filter(
							(item) => item.category_id === 3
						)}
						suppliers={suppliers}
						category={'Beer'}
						toggleRefresh={toggleRefresh}
					/>
				) : null}
			</TabPanel>
			<TabPanel value={value} index={3}>
				{menuItems ? (
					<MenuItemTable
						items={menuItems.items.filter(
							(item) => item.category_id === 4
						)}
						suppliers={suppliers}
						category={'NABev'}
						toggleRefresh={toggleRefresh}
					/>
				) : null}
			</TabPanel>
			<Modal
				open={isOpen}
				onClose={toggleModal}
				aria-labelledby="modal-Register"
				aria-describedby="modal-Register"
			>
				{showMenuItemOne ? (
					<MenuItemForm
						suppliers={suppliers}
						toggle={toggleModal}
						submit={handleFirstSubmit}
						newItem={newItem}
						showMenu={showMenuItemTwo}
					/>
				) : (
					<MenuItemIngredientForm
						addIngredient={addIngredient}
						ingredients={ingredients}
						products={products}
						submit={handleSubmitToAPI}
						toggleForm={toggleForm}
					/>
				)}
			</Modal>
		</Box>
	);
}
