import { Box, Button } from '@mui/material';
import '../styles/Inventories.css';
import { useState } from 'react';
import UserDatePicker from './UserDatePicker';
export default function Inventories() {
	const [ showDates, setShowDates ] = useState(false);
    const [ begDate, setBegDate ] = useState({ begDate: new Date() });
	const [ endDate, setEndDate ] = useState({ endDate: new Date() });
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
    const handleSubmit = () => {

    }
    const toggleDatePicker = () => {
        setShowDates(prevState => !prevState)
    }
	const inventoryButtons = (
		<Box>
			<Button onClick={toggleDatePicker} variant="contained">Select Inventory</Button>
			<Button sx={{ marginLeft: '1rem' }} variant="contained">
				Start New Inventory
			</Button>
		</Box>
	);
	return (
		<Box className="Inventories">
			<h1>Inventories</h1>
			{!showDates ? inventoryButtons : null}
            {showDates ? 
            <Box>
                <UserDatePicker 
                    begDate={begDate}
                    endDate={endDate}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    />
                <Button sx={{marginTop: "1rem"}} onClick={toggleDatePicker} variant="contained">Go Back</Button>
            </Box>  
                  
                 : null}
                       
		</Box>
	);
}
