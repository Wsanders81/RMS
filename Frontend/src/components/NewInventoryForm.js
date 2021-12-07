import { useState, useEffect } from 'react';
import { getProductsForInventory } from '../actions/actions';
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
	Box,
	Typography,
	Button,
	Tabs,
	Tab, 
	Modal
} from '@mui/material';
import { addInventory } from '../actions/actions';
import InventoryCategory from './InventoryCategory';
import InventoryModal from './InventoryModal';
import SalesForm from '../forms/SalesForm';
import {ALERT} from '../actions/types'
const INV_INITIAL_STATE = {
	Food    : '',
	Alcohol : '',
	Beer    : '',
	NABev   : '', 
    Sales : {
        Food: "", 
        Alcohol: "", 
        Beer: "", 
        NABev: ""
    }
};
const SUBMIT_INITIAL_STATE = {
	Food    : false,
	Alcohol : false,
	Beer    : false,
	NABev   : false, 
    Sales: false
};
function NewInventoryForm({toggle, date, setInv}) {
	const [ submitted, setSubmitted ] = useState(SUBMIT_INITIAL_STATE);
	const [isOpen, setIsOpen] = useState(false)
	const [ isLoading, setIsLoading ] = useState(true);
	const [ products, setProducts ] = useState(null);
	const [ value, setValue ] = useState(0);
	const [ invVals, setInvVals ] = useState(INV_INITIAL_STATE);
	const dispatch = useDispatch()
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
	
	const handleSubmit = (e, category, values) => {
        e.preventDefault()
		setInvVals((state) => {
			state[category] = values;
			return state;
		});
		setSubmitted((state) => {
			state[category] = true;
			return state;
		});
        
		setProducts((state) => {
			return { ...state };
		});
        
	};
	const toggleModal = () => {
		setIsOpen(isOpen=> !isOpen)
	}
    const submitInventory = async() => {
		
        const res = await addInventory(invVals, date)
		if(res === "error"){ 
			dispatch({type:ALERT, typeOfNotify: "error", message: "Please submit all categories"})
			return
		}
        dispatch({type:ALERT, typeOfNotify: 'success', message: "Your inventory was successfully posted"})
		await setSubmitted(SUBMIT_INITIAL_STATE)
		setInv(res)
		const reset = false
        toggle(reset)
    }
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
			<div
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
			</div>
		);
	}
	function a11yProps(index) {
		return {
			id              : `simple-tab-${index}`,
			'aria-controls' : `simple-tabpanel-${index}`
		};
	}
	if (isLoading) return <h1>Loading</h1>;
	
	
	return (
		<>
		<Box sx={{ width: '100%' }}>
            <Button variant='contained' onClick={toggle} color="error">Go Back</Button>
            <Button variant="contained" onClick={toggleModal}>Submit Inventory</Button>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Food" {...a11yProps(0)} />
					<Tab label="Alcohol" {...a11yProps(1)} />
					<Tab label="Beer" {...a11yProps(2)} />
					<Tab label="NA Bev" {...a11yProps(3)} />
					<Tab label="Sales" {...a11yProps(4)} />
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
				/>
			</TabPanel>
            <TabPanel value={value} index={4}>
                <SalesForm 
                    unsubmit={handleUnsubmit}
                    submitted={submitted}
                    category={'Sales'}
                    submit={handleSubmit}
                    invVals={invVals}/>
                    
            </TabPanel>
            
		</Box>
		<Modal
			open={isOpen}
			onClose={toggleModal}
			aria-labelledby="modal-Register"
        	aria-describedby="modal-Register"
			>
			<InventoryModal message={"Are you sure you want to submit?"} buttonText={"Submit"} color={"success"} submit={submitInventory}/>
			</Modal>
		</>
	);
}
export default NewInventoryForm;
