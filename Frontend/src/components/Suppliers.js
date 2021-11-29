import '../styles/Suppliers.css';
import { Box, Button } from '@mui/material';
import { getSuppliers } from '../actions/actions';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function Suppliers() {
	const [ suppliers, setSuppliers ] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		const getAllSuppliers = async function() {
			const allSuppliers = await getSuppliers();
			setSuppliers(allSuppliers.suppliers);
            allSuppliers.suppliers.map(supplier => {
                
                dispatch({type: "GET_SUPPLIERS", supplier})
            })
		};
		getAllSuppliers();
	}, []);
	const handleClick = (supplierId) => {
		navigate(`/suppliers/${supplierId}`);
	};
	return (
		<Box className="Suppliers">
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
		</Box>
	);
}
