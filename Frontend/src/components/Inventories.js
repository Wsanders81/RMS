import { Box, Button, Modal, Paper } from '@mui/material';
import '../styles/Inventories.css';
import { useState } from 'react';
import UserDatePicker from './UserDatePicker';
import { getAllInventories, getInventory, addInventory } from '../actions/actions';
import moment from 'moment';
import NewInventoryForm from './NewInventoryForm';
import InventoryModal from './InventoryModal';
export default function Inventories() {
	const [ showDates, setShowDates ] = useState(false);
	const [ begDate, setBegDate ] = useState({ begDate: new Date() });
	const [ endDate, setEndDate ] = useState({ endDate: new Date() });
	const [ inventories, setInventories ] = useState(null);
	const [ selectedInv, setSelectedInv ] = useState(null);
    const [ showInvForm, setShowInvForm] = useState(false)
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
			setInventories(null);
		}
	};

    const toggleInvForm = () => {
        setShowInvForm(prevState => !prevState)
		setSelectedInv(null);
		setInventories(null);
    }
	const handleSelect = async (id) => {
		const res = await getInventory(id);
		setSelectedInv(res);
		toggleDatePicker();
	};

	const inventoryButtons = (
		<Box>
			<Button onClick={toggleDatePicker} variant="contained">
				Select Inventory
			</Button>
			<Button onClick={toggleInvForm}  sx={{ marginLeft: '1rem' }} variant="contained">
				Start New Inventory
			</Button>
		</Box>
	);

	const inventoryTable = selectedInv ? (
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Food Sales</th>
					<th>Beer Sales</th>
					<th>Alcohol Sales</th>
					<th>NA Bev Sales</th>
					<th>Total Sales</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						{moment(selectedInv.inventory.date).format(
							'ddd MMM DD YY'
						)}
					</td>
					<td>${selectedInv.inventory.food_sales}</td>
					<td>${selectedInv.inventory.beer_sales}</td>
					<td>${selectedInv.inventory.alcohol_sales}</td>
					<td>${selectedInv.inventory.na_bev_sales}</td>
					<td>
						{selectedInv.inventory.food_sales +
							selectedInv.inventory.beer_sales +
							selectedInv.inventory.alcohol_sales +
							selectedInv.inventory.na_bev_sales}
					</td>
				</tr>
			</tbody>
			<thead>
				<tr>
					<th>Product Name</th>
					<th>Unit</th>
					<th>Price</th>
					<th>Qty On Hand</th>
					<th>Extended Cost</th>
				</tr>
			</thead>
			<tbody>
				{selectedInv.inventory.items.map((item) => {
					return (
						<tr key={item.id}>
							<td>{item.product_name}</td>
							<td>{item.unit}</td>
							<td>{item.price}</td>
							<td>{item.quantity}</td>
							<td>{item.quantity * item.price}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	) : null;
	return (
		<Box className="Inventories">
			<h1>Inventories</h1>
            
            
			{!showDates && !showInvForm ? inventoryButtons : null}
			{showDates ? (
				<Box>
					<UserDatePicker
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
										<h5>
											{moment(inv.date).format(
												'ddd MMM DD YY'
											)}
										</h5>
										<p>Food Sales: {inv.food_sales}</p>
										<p>Beer Sales: {inv.beer_sales}</p>
										<p>
											Alcohol Sales: {inv.alcohol_sales}
										</p>
										<p>NA Bev Sales: {inv.na_bev_sales}</p>
									</Paper>
								);
							})
						) : null}
					</Box>
					<Button
						sx={{ marginTop: '1rem' }}
						onClick={toggleDatePicker}
						variant="contained"
					>
						Go Back
					</Button>
				</Box>
			) : null}
			{selectedInv ? inventoryTable : null}
            {showInvForm ? <NewInventoryForm toggle={toggleInvForm}/> : null}
			
		</Box>
	);
}
