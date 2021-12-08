import { Form, Formik, Field, ErrorMessage } from 'formik';
import {
	Card,
	CardContent,
	Typography,
	TextField,
	FormGroup,
	Box,
	Button,
	Select,
	MenuItem
} from '@mui/material';
import { object, string, number } from 'yup';
export default function MenuItemForm({ submit, newItem }) {
	const initialValues = {
		name        : newItem.name !== '' ? newItem.name : '',
		price       : newItem.price !== '' ? newItem.price : '',
		category_id : ''
	};

	return (
		<div className="Supplier-modal">
			<Card sx={{ margin: 'auto', height: '100%' }}>
				<CardContent>
					<Typography variant="h4" mb={2}>
						Add New Menu Item
					</Typography>
					
					<Formik
						validationSchema={object({
							name        : string()
								.required('Required')
								.min(2, 'Too Short!')
								.max(15),
							price       : number().required('Required'),
							category_id : string().required('Required')
						})}
						initialValues={initialValues}
						onSubmit={(values) => {
							submit(values);
						}}
					>
						{({ values, errors }) => (
							<Form>
								<FormGroup>
									<Box mb={2}>
										<Field
											name="name"
											as={TextField}
											label="Product Name"
										/>
										<ErrorMessage
											name="name"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
									<Box mb={2}>
										<Field
											name="price"
											as={TextField}
											label="Price"
										/>
										<ErrorMessage
											name="price"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{'Must be a valid number'}
												</div>
											)}
										/>
									</Box>
									<label htmlFor="category_id">
										Category
									</label>
									<Field
										id="category_id"
										name="category_id"
										as={Select}
										label="Category"
										style={{
											width  : '10rem',
											margin : 'auto'
										}}
									>
										<MenuItem value={1}>Food</MenuItem>
										<MenuItem value={2}>Alcohol</MenuItem>
										<MenuItem value={3}>Beer</MenuItem>
										<MenuItem value={4}>NABev</MenuItem>
									</Field>
									<Box mb={2}>
										<ErrorMessage
											name="category_id"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
								</FormGroup>
								<Button
									variant="contained"
									type="submit"
									style={{ backgroundColor: '#81c784' }}
								>
									Save and enter ingredients
								</Button>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</div>
	);
}
