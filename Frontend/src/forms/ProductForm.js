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
import { useDispatch } from 'react-redux';
import { forwardRef } from 'react';
const ProductForm = forwardRef((props, ref) => {
	const initialValues = {
		name              : '',
		unit              : '',
		quantity_per_unit : '',
		price             : '',
		supplier_id       : supplierId,
		category_id       : ''
	};
	const dispatch = useDispatch();
	const { submit, supplierId } = props;
	return (
		<div className="Supplier-modal">
			<Card sx={{ margin: 'auto', height: '100%' }}>
				<CardContent>
					<Typography variant="h4" mb={2}>
						Add New Product
					</Typography>
					<Formik
						validationSchema={object({
							name              : string()
								.required('Required')
								.min(2, 'Too Short!')
								.max(15),
							unit              : string()
								.required('Required')
								.min(2, 'Too Short!')
								.max(20),
							quantity_per_unit : number().required('Required'),
							price             : number().required('Required'),
							category_id       : string().required('Required')
						})}
						initialValues={initialValues}
						onSubmit={async (values) => {
							try {
								let res = await submit(values);
								return res;
							} catch (err) {
								dispatch({
									type         : 'ALERT',
									typeOfNotify : 'error',
									message      :
										'That product name is already taken'
								});
							}
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
											name="unit"
											as={TextField}
											label="Unit"
										/>
										<ErrorMessage
											name="unit"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
									<Box mb={2}>
										<Field
											name="quantity_per_unit"
											as={TextField}
											label="Quantity per unit"
										/>
										<ErrorMessage
											name="quantity_per_unit"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{'Must be a valid number'}
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
										name="category_id"
										as={Select}
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
									Submit
								</Button>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</div>
	);
});
export default ProductForm;
