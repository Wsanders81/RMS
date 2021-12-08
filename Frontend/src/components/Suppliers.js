import '../styles/Suppliers.css';
import { Box, Button, Modal } from '@mui/material';
import { getSuppliers, addSupplier } from '../actions/actions';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOCATION } from '../actions/types';
import SupplierForm from '../forms/SupplierForm';
export default function Suppliers() {
	const [ suppliers, setSuppliers ] = useState(null);
	const [ isOpen, setIsOpen ] = useState(false);

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
		[ dispatch ]
	);
	const toggleModal = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	const handleClick = (supplierId) => {
		navigate(`/suppliers/${supplierId}`);
	};
	const handleSubmit = async (values) => {
		const res = await addSupplier(values);
		console.log(res);
	};
	console.log(suppliers)
	return (
		<Box className="Suppliers">
			{user.isAdmin === 'true' ? (
				<Button onClick={toggleModal} variant="outlined">
					Add Supplier
				</Button>
			) : null}

			<h1>Suppliers</h1>
			{suppliers ? (
				suppliers.map((supplier) => {
					return (
						<Box key={supplier.id}>
							<h3>{supplier.name} </h3>
							<p>Address: {supplier.address}</p>
							<p>Phone: {supplier.phone}</p>
							<p>Email: {supplier.email}</p>
							<Button onClick={() => handleClick(supplier.id)}>
								See More
							</Button>
						</Box>
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
		</Box>
	);
}
