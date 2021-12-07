import { Box, Button, Paper } from '@mui/material';
import '../styles/Inventories.css';
import { useState } from 'react';
import UserDatePicker from './UserDatePicker';
import { getAllInventories, getInventory, deleteInventory } from '../actions/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {ALERT} from '../actions/types'
import NewInventoryForm from './NewInventoryForm';
import InventoryTable from './InventoryTable';
export default function Inventories() {
	const [ showDates, setShowDates ] = useState(false);
	const [ begDate, setBegDate ] = useState({ begDate: new Date() });
	const [ endDate, setEndDate ] = useState({ endDate: new Date() });
	const [ inventories, setInventories ] = useState(null);
	const [ selectedInv, setSelectedInv ] = useState(null);
    const [ showInvForm, setShowInvForm] = useState(false)
	const dispatch = useDispatch()	
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

    const toggleInvForm = (reset) => {
        setShowInvForm(prevState => !prevState)
		
		setInventories(null);
		if(reset === false) {
			return 
		} else {
			setSelectedInv(null);
		}
    }
	const handleSelect = async (id) => {
		const res = await getInventory(id);
		
		setSelectedInv(res);
		toggleDatePicker();
	};
	const handleDelete = async()=> {
		const res = await deleteInventory(selectedInv.inventory.id)
		if(res === "Inventory successfully deleted") {
			setSelectedInv(null)
			toggleDatePicker()
			dispatch({type:ALERT, typeOfNotify: 'success', message: "Inventory successfully deleted"})
		}
	}

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
	
	return (
		<Box className="Inventories">
			<h1>Inventories</h1>
			{showInvForm ? <UserDatePicker begDate={begDate} showSubmit={false} handleChange={handleChange}/>  : null}
            
			{!showDates && !showInvForm ? inventoryButtons : null}
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
			{selectedInv ? <InventoryTable inventory={selectedInv} removeInv={handleDelete}/> : null}
            {showInvForm ? <NewInventoryForm setInv={setSelectedInv} date={begDate.begDate} toggle={toggleInvForm}/> : null}
			
		</Box>
	);
}
