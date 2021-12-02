import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSupplierProducts } from '../actions/actions';
import '../styles/Suppliers.css';
export default function Supplier() {
	const { id } = useParams('id');
	const [ products, setProducts ] = useState(null);
	const supplier = useSelector((store) => store.supplierReducer)[id];
	//TODO: Add suppliers to local state. App crashing on refresh
	useEffect(
		() => {
			const getProducts = async function() {
				const products = await getSupplierProducts(id);
				setProducts(products);
			};
			getProducts();
		},
		[ id ]
	);
	
	return (
		<Box className="Suppliers">
			<h1>Supplier Page</h1>
			<h3>{supplier.name}</h3>
			<p>address: {supplier.address} / phone: {supplier.phone} / email: {supplier.email}</p>
			<table>
				<thead>
				<tr>
					<th>Product id</th>
					<th>Name</th>
					<th>Unit</th>
					<th>Qty per unit</th>
					<th>Price</th>
				</tr>
				</thead>
                <tbody>
				{products ? (
					products.products.map((product) => {
						return (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.name}</td>
								<td>{product.unit}</td>
								<td>{product.qty_per_unit}</td>
								<td>${product.price}</td>
							</tr>
						);
					})
				) : null}
                </tbody>
			</table>
		</Box>
	);
}
