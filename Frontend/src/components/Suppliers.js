import '../styles/Suppliers.css';
import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { getSuppliers, addSupplier } from '../actions/actions';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOCATION, ALERT } from '../actions/types';
import SupplierForm from '../forms/SupplierForm';
export default function Suppliers() {
	const [ suppliers, setSuppliers ] = useState(null);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ refresh, setRefresh ] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.userReducer);
	useEffect(
		() => {
			const getAllSuppliers = async function() {
				const allSuppliers = await getSuppliers();
				setSuppliers(allSuppliers.suppliers);
				allSuppliers.suppliers.map((supplier) => {
					return dispatch({ type: 'GET_SUPPLIERS', supplier });
				});
			};
			const setLocation = () => {
				dispatch({ type: SET_LOCATION, location: 'Suppliers' });
			};
			setLocation();
			getAllSuppliers();
		},
		[ dispatch, refresh ]
	);
	const toggleModal = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	const handleClick = (supplierId) => {
		navigate(`/suppliers/${supplierId}`);
	};
	const handleSubmit = async (values) => {
		const res = await addSupplier(values);
		if (res.newSupplier) {
			dispatch({
				type         : ALERT,
				typeOfNotify : 'success',
				message      : 'Supplier successfully added'
			});
			setRefresh((state) => !state);
			toggleModal();
		}
		return res;
	};

	return (
		<div className="container-fluid Suppliers">
			{user.isAdmin === 'true' ? (
				<Button
					sx={{ marginBottom: '1rem' }}
					onClick={toggleModal}
					variant="outlined"
				>
					Add Supplier
				</Button>
			) : null}
			<h4 className="Supplier-card-title">
				Select Supplier For More Info
			</h4>
			{suppliers ? (
				suppliers.map((supplier) => {
					const phoneNumber =
						'(' +
						supplier.phone.slice(0, 3) +
						') ' +
						supplier.phone.slice(3, 6) +
						'-' +
						supplier.phone.slice(6);
					return (
						<div className="row Supplier-Row">
							<Paper
								onClick={() => handleClick(supplier.id)}
								key={supplier.id}
								className="Supplier-card"
							>
								<p className="Supplier-card-title">
									{supplier.name}{' '}
								</p>
								<p className="Supplier-card-text">
									Address: {supplier.address}
								</p>
								<p className="Supplier-card-text">
									Phone: {phoneNumber}
								</p>
								<p className="Supplier-card-text">
									Email: {supplier.email}
								</p>
							</Paper>
						</div>
					);
				})
			) : null}
			<Modal
				open={isOpen}
				onClose={toggleModal}
				aria-labelledby="modal-Register"
				aria-describedby="modal-Register"
			>
				<SupplierForm submit={handleSubmit} />
			</Modal>
		</div>
	);
}
