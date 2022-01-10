import { Form, Formik, Field, ErrorMessage } from 'formik';
import {
	Card,
	CardContent,
	Typography,
	TextField,
	FormGroup,
	Box,
	Button
} from '@mui/material';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../actions/actions';
import { useDispatch } from 'react-redux';
import { ALERT } from '../actions/types';
export default function RegistrationForm({ toggle }) {
	const initialValues = {
		username       : '',
		firstName      : '',
		lastName       : '',
		email          : '',
		restaurantName : '',
		password       : ''
	};
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<div style={{ textAlign: 'center' }}>
			<Card sx={{ margin: 'auto', height: '40rem' }}>
				<CardContent>
					<Typography variant="h4" mb={2}>
						Sign Up
					</Typography>
					<Formik
						validationSchema={object({
							username       : string()
								.required('Required')
								.min(2, 'Too Short!')
								.max(15),
							firstName      : string()
								.required('Required')
								.min(3, 'Too Short!')
								.max(20),
							lastName       : string()
								.required('Required')
								.min(3, 'Too Short!')
								.max(20),
							email          : string()
								.email('Invalid Email')
								.required('Required'),
							restaurantName : string()
								.required('Required')
								.min(3, 'Too Short!')
								.max(20),
							password       : string()
								.required('Required')
								.min(5, 'Add some more characters!')
								.max(
									20,
									'How long does your password need to be?'
								)
						})}
						initialValues={initialValues}
						onSubmit={async (values) => {
							try {
								let res = await dispatch(registerUser(values));

								if (res.token) {
									toggle();
									dispatch({
										type         : ALERT,
										typeOfNotify : 'success',
										message      : `Welcome, ${res.username}!`
									});
									navigate('/dashboard');
								}
							} catch (err) {
								dispatch({
									type         : ALERT,
									typeOfNotify : 'error',
									message      : 'Username already taken'
								});

								console.log(err);
							}
						}}
					>
						{({ values, errors }) => (
							<Form style={{ height: '100vh' }}>
								<FormGroup>
									<Box mb={2}>
										<Field
											name="username"
											as={TextField}
											label="Username"
										/>
										<ErrorMessage
											name="username"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
									<Box mb={2}>
										<Field
											name="firstName"
											as={TextField}
											label="First Name"
										/>
										<ErrorMessage
											name="firstName"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
									<Box mb={2}>
										<Field
											name="lastName"
											as={TextField}
											label="Last Name"
										/>
										<ErrorMessage
											name="lastName"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
									<Box mb={2}>
										<Field
											name="email"
											as={TextField}
											label="Email"
										/>
										<ErrorMessage
											name="email"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
									<Box mb={2}>
										<Field
											name="restaurantName"
											as={TextField}
											label="Restaurant Name"
										/>
										<ErrorMessage
											name="restaurantName"
											render={(msg) => (
												<div style={{ color: 'red' }}>
													{msg}
												</div>
											)}
										/>
									</Box>
									<Box mb={2}>
										<Field
											name="password"
											type="password"
											as={TextField}
											label="Password"
										/>
										<ErrorMessage
											name="password"
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
									Get Started
								</Button>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</div>
	);
}
