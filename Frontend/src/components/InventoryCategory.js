import {
	Box,
	FormGroup,
	FormControl,
	TextField,
	InputAdornment,
	Button
} from '@mui/material';
import { useState } from 'react';
function InventoryCategory({
	category,
	products,
	submit,
	submitted,
	unsubmit,
	invVals
}) {
	const [ items, setItems ] = useState(products);
	const handleChange = (e, i) => {
		const { name, value } = e.target;

		setItems((state) => {
			state[i].quantity = value;
			return state;
		});
	};

	return (
		<Box>
			<FormControl>
				{products.map((item, i) => {
					return (
						<TextField
							key={item.id}
							type="number"
							label={item.name}
							defaultValue={item.quantity}
							onChange={(e) => handleChange(e, i)}
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
				{submitted[category] === false ? (
					<Button
						onClick={(e) => submit(e, category, items)}
						variant="contained"
					>
						{`Submit ${category} Inventory`}
					</Button>
				) : (
					<Button onClick={() => unsubmit(category)}>
						Undo Submit
					</Button>
				)}
			</FormControl>
		</Box>
	);
}
export default InventoryCategory;
