import { Box, Typography } from '@mui/material';
import { useState, forwardRef } from 'react';
import UserDatePicker from './UserDatePicker';
import SalesForm from '../forms/SalesForm';
const SalesModal = forwardRef((props, ref) => {
	const [ showDatePicker, setShowDatePicker ] = useState(true);
	const { handleChange, begDate, handleSalesSubmit } = props;
	const handleSubmit = () => {
		setShowDatePicker(false);
	};
	const submitted = {
		Sales : false
	};

	return (
		<Box className="Sales-modal">
			<Typography className="Sales-modal-topText" align="center">
				Please select date to add sales
			</Typography>
			{showDatePicker === true ? (
				<UserDatePicker
					handleSubmit={handleSubmit}
					begDate={begDate}
					showSubmit={true}
					handleChange={handleChange}
				/>
			) : null}
			<Box className="Sales-modal-form">
				{showDatePicker === false ? (
					<SalesForm
						date={begDate}
						submit={handleSalesSubmit}
						className="Sales-modal-form"
						category={'Sales'}
						submitted={submitted}
					/>
				) : null}
			</Box>
		</Box>
	);
});

export default SalesModal;
