import { forwardRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
const InventoryModal = forwardRef((props, ref) => {
	const { submit, message, buttonText, color } = props;
	return (
		<Box className="Inventory-modal" ref={ref}>
			<Typography
				variant="body1"
				className="Inventory-modal-topText"
				align="center"
			>
				{message}
			</Typography>
			<Typography
				variant="body1"
				className="Inventory-modal-warningText"
				align="center"
			>
				<b>This cannot be undone!</b>
			</Typography>
			<Typography variant="body1" align="center">
				<Button
					onClick={submit}
					className="Inventory-modal-button"
					color={color}
					variant="contained"
				>
					{buttonText}
				</Button>
			</Typography>
		</Box>
	);
});

export default InventoryModal;
