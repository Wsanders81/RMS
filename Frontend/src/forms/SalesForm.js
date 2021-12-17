import { useState } from 'react';
import {
	Box,
	FormControl,
	InputAdornment,
	TextField,
	Button
} from '@mui/material';
export default function SalesForm({
	category,
	submit,
	submitted,
	unsubmit,
	invVals,
	date,
	value
}) {
	const SALES_INITIAL_STATE = {
		Food    : '',
		Alcohol : '',
		Beer    : '',
		NABev   : ''
	};
	const categoryLabels = {
		Sales     : 'Sales',
		Purchases : 'Purchases',
		BegInv    : 'Beginning Inventory'
	};
	const salesDate = date ? date : null;
	const [ sales, setSales ] = useState(
		invVals ? invVals : SALES_INITIAL_STATE
	);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setSales((state) => {
			return {
				...state,
				[name] : value
			};
		});
	};
	let values = sales;
	return (
		<Box>
			<FormControl>
				<TextField
					autoFocus
					type="number"
					label={'Food ' + categoryLabels[category]}
					value={sales.Food}
					onChange={handleChange}
					name="Food"
					disabled={submitted[category]}
					InputProps={{
						startAdornment : (
							<InputAdornment position="start">$</InputAdornment>
						)
					}}
				/>
				<TextField
					sx={{ marginTop: '1rem' }}
					type="number"
					label={'Alcohol ' + categoryLabels[category]}
					value={sales.Alcohol}
					onChange={handleChange}
					name="Alcohol"
					disabled={submitted[category]}
					InputProps={{
						startAdornment : (
							<InputAdornment position="start">$</InputAdornment>
						)
					}}
				/>
				<TextField
					sx={{ marginTop: '1rem' }}
					type="number"
					label={'Beer ' + categoryLabels[category]}
					value={sales.Beer}
					onChange={handleChange}
					name="Beer"
					disabled={submitted[category]}
					InputProps={{
						startAdornment : (
							<InputAdornment position="start">$</InputAdornment>
						)
					}}
				/>
				<TextField
					sx={{ marginTop: '1rem' }}
					type="number"
					label={'NA Bev ' + categoryLabels[category]}
					value={sales.NABev}
					onChange={handleChange}
					name="NABev"
					disabled={submitted[category]}
					InputProps={{
						startAdornment : (
							<InputAdornment position="start">$</InputAdornment>
						)
					}}
				/>
				{submitted[category] === false ? (
					<Button
						sx={{ marginTop: '1rem' }}
						onClick={(e) =>
							submit(e, category, values, salesDate, value)}
						variant="contained"
					>
						{`Submit ${category === 'BegInv'
							? 'Beggining Inventory'
							: category}`}
					</Button>
				) : (
					<Button
						sx={{ marginTop: '1rem' }}
						onClick={() => unsubmit(category)}
					>
						Undo Submit
					</Button>
				)}
			</FormControl>
		</Box>
	);
}
