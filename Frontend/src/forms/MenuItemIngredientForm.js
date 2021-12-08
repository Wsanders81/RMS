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
import { useState } from 'react';

export default function MenuItemIngredientForm({
	addIngredient,
	ingredients,
	products,
	submit,
	toggleForm
}) {
	const initialValues = {
		product_id : '',
		quantity   : ''
	};
	return (
		<div className="Supplier-modal">
			<Card sx={{ margin: 'auto', height: '100%' }}>
				<CardContent>
					<Typography variant="h4" mb={2}>
						Add New Menu Item
					</Typography>
					<Button onClick={toggleForm} color="error">
						Go Back
					</Button>
					<Formik
						initialValues={initialValues}
						onSubmit={(values) => {
							addIngredient(values);
						}}
					>
						{({ values, errors }) => (
							<Form>
								<FormGroup>
									<label htmlFor="product_id">Product</label>
									<Field
										id="product_id"
										name="product_id"
										as={Select}
										style={{
											width  : '15rem',
											margin : 'auto'
										}}
									>
										<MenuItem disabled>__FOOD__</MenuItem>
										{products.food.map((item) => {
											return (
												<MenuItem
													value={item.product_id}
												>
													{item.name} / {item.unit}
												</MenuItem>
											);
										})}
										<MenuItem disabled>
											__ALCOHOL__
										</MenuItem>
										{products.alcohol.map((item) => {
											return (
												<MenuItem
													value={item.product_id}
												>
													{item.name} / {item.unit}
												</MenuItem>
											);
										})}
										<MenuItem disabled>__BEER__</MenuItem>
										{products.beer.map((item) => {
											return (
												<MenuItem
													value={item.product_id}
												>
													{item.name} / {item.unit}
												</MenuItem>
											);
										})}
										<MenuItem disabled>__NABEV__</MenuItem>
										{products.NABev.map((item) => {
											return (
												<MenuItem
													value={item.product_id}
												>
													{item.name} / {item.unit}
												</MenuItem>
											);
										})}
									</Field>
									<Box mb={2}>
										<ErrorMessage
											name="product_id"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
									<Box mb={2}>
										<Field
											name="quantity"
											as={TextField}
											label="Quantity"
										/>
										<ErrorMessage
											name="quantity"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{'Must be a valid number'}
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
									{!ingredients.length ? (
										'Enter Ingredient '
									) : (
										'Add another ingredient'
									)}
								</Button>
							</Form>
						)}
					</Formik>
					{ingredients.length ? (
						<Typography variant="body1" sx={{ marginTop: '1rem' }}>
							{' '}
							Added Ingredients:{' '}
						</Typography>
					) : null}
					<ul className="list-group">
						{ingredients.length ? (
							ingredients.map((ingredient) => {
								return (
									<li class="list-group-item">
										Product Id: {ingredient.product_id} /
										Quantity: {ingredient.quantity}
									</li>
								);
							})
						) : null}
					</ul>
					{ingredients.length ? (
						<Button
							variant="contained"
							sx={{
								position  : 'absolute',
								bottom    : '1rem',
								transform : 'translateX(-50%)'
							}}
							onClick={submit}
						>
							Submit menu item
						</Button>
					) : null}
				</CardContent>
			</Card>
		</div>
	);
}
