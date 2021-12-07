import { Box, Input, FormGroup, Button } from '@mui/material';
import '../styles/UserDatePicker.css';
export default function UserDatePicker({
	begDate,
	endDate,
	handleChange,
	handleSubmit, 
	showSubmit
}) {
	return (
		<Box
			sx={{
				paddingTop     : '5rem',
				width          : '75%',
				display        : 'flex',
				justifyContent : 'space-evenly',
				margin         : 'auto'
			}}
		>
			<FormGroup>
				<Box sx={{ width: '10rem' }}>
					<Input
						type="date"
						name="begDate"
						onChange={handleChange}
						value={begDate.begDate}
					/>
				</Box>
				{endDate ? (
					<Box sx={{ width: '10rem' }}>
						<Input
							type="date"
							name="endDate"
							onChange={handleChange}
							value={endDate.endDate}
						/>
					</Box>
				) : null}
				{showSubmit ? <Button onClick={handleSubmit} variant="contained">
					Submit
				</Button> : null}
			</FormGroup>
		</Box>
	);
}
