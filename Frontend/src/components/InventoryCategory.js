import {
	Box,
	FormControl,
	TextField,
	InputAdornment,
	Button,
	Typography
} from '@mui/material';
import { useState } from 'react';
function InventoryCategory({
	category,
	products,
	submit,
	submitted,
	unsubmit,
	value
}) {
	const [ items, setItems ] = useState(products);
	const [ total, setTotal ] = useState(0);
	const handleChange = (e, i, price) => {
		const { name, value } = e.target;
		const getPriceAndQuantity = items.map(
			(item) => item.price * item.quantity
		);
		const calculateTotal = getPriceAndQuantity.reduce(
			(acc, next) => acc + next
		);
		setTotal(calculateTotal);
		setItems((state) => {
			state[i].quantity = value;
			state[i].extendedValue = value * price;
			return state;
		});
		return name;
	};

	return (
		<Box>
			<FormControl>
				{products.map((item, i) => {
					return (
						<TextField
							sx={{ marginTop: '1rem' }}
							key={item.product_id}
							type="number"
							autoFocus={i === 0 ? true : false}
							label={item.name}
							defaultValue={item.quantity}
							onChange={(e) => handleChange(e, i, item.price)}
							name={item.name}
							disabled={submitted[category]}
							InputProps={{
								endAdornment : (
									<InputAdornment position="end">
										{item.unit}
									</InputAdornment>
								)
							}}
						/>
					);
				})}
				<Typography
				className="Inventory-total"
					sx={{ marginTop: '1rem' }}
				>{`Total ${category} Value: $${total.toFixed(2)} `}</Typography>
				{submitted[category] === false ? (
					<Button
						id="Inventory-submit-button"
						onClick={(e) => submit(e, category, items, null, value)}
						variant="contained"
					>
						{`Submit ${category} Inventory`}
					</Button>
				) : (
					<Button
						color="secondary"
						onClick={() => unsubmit(category)}
					>
						Undo Submit
					</Button>
				)}
			</FormControl>
		</Box>
	);
}
export default InventoryCategory;
