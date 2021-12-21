import { Box, Input, FormGroup, Button, Typography } from '@mui/material';
import '../styles/UserDatePicker.css';
export default function UserDatePicker({
	begDate,
	endDate,
	handleChange,
	handleSubmit,
	showSubmit,
	title
}) {
	return (
		<Box
			sx={{
				paddingTop    : '1rem',
				width         : '75%',
				display       : 'flex',
				flexDirection : 'column',
				margin        : 'auto',
				paddingBottom : '1rem'
			}}
		>
			{title ? <Typography>{title}</Typography> : null}
			<FormGroup sx={{ margin: 'auto' }}>
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
							sx={{ marginTop: '1rem' }}
							type="date"
							name="endDate"
							onChange={handleChange}
							value={endDate.endDate}
						/>
					</Box>
				) : null}

				{showSubmit ? (
					<Button
						id="UserDatePicker-button"
						onClick={handleSubmit}
						variant="contained"
						color="success"
					>
						Submit
					</Button>
				) : null}
			</FormGroup>
		</Box>
	);
}
