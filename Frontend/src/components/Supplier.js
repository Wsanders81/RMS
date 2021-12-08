import { Box, Button, Modal } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	getSupplierProducts,
	addSupplierProduct,
	deleteSupplierProduct
} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ALERT } from '../actions/types';
import InventoryModal from './InventoryModal';
import ProductForm from '../forms/ProductForm';
import '../styles/Suppliers.css';
export default function Supplier() {
	const { id } = useParams('id');
	const [ products, setProducts ] = useState(null);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ isOpen2, setIsOpen2 ] = useState(false);
	const [ productToDelete, setProductToDelete ] = useState(0);
	const supplier = useSelector((store) => store.supplierReducer)[id];
	const user = useSelector((store) => store.userReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//TODO: Add suppliers to local state. App crashing on refresh
	useEffect(
		() => {
			const getProducts = async function() {
				const products = await getSupplierProducts(id);
				setProducts(products);
			};

			getProducts();
		},
		[ id, isOpen2, isOpen ]
	);

	const toggleModal = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	const toggleModal2 = (e, id) => {
		setIsOpen2((isOpen) => !isOpen);
		setProductToDelete(id);
	};
	const handleSubmit = async (data) => {
		const res = await addSupplierProduct(data);
		if (res.product) {
			toggleModal();
			dispatch({
				type         : ALERT,
				typeOfNotify : 'success',
				message      : 'Product successfully added'
			});
		}
	};
	const deleteProduct = async () => {
		const res = await deleteSupplierProduct(productToDelete);
		if (res.message) {
			toggleModal2();
			dispatch({
				type         : ALERT,
				typeOfNotify : 'success',
				message      : 'Your product was successfully deleted'
			});
		}
	};

	return (
		<Box className="Suppliers">
			<h1>Supplier Page</h1>
			<Box>
				<Button onClick={() => navigate('/suppliers')}>
					Back To Suppliers
				</Button>
			</Box>
			{user.isAdmin === 'true' ? (
				<Button onClick={toggleModal}>Add Products</Button>
			) : null}
			<h3>{supplier.name}</h3>
			<p>
				address: {supplier.address} / phone: {supplier.phone} / email:{' '}
				{supplier.email}
			</p>
			<table className="table table-striped">
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
									<td>
										{user.isAdmin === 'true' ? (
											<FontAwesomeIcon
												onClick={(e) =>
													toggleModal2(e, product.id)}
												className="Supplier-delete"
												icon={faTrashAlt}
											/>
										) : null}
									</td>
								</tr>
							);
						})
					) : null}
				</tbody>
			</table>
			<Modal
				open={isOpen}
				onClose={toggleModal}
				aria-labelledby="modal-Register"
				aria-describedby="modal-Register"
			>
				<ProductForm submit={handleSubmit} supplierId={supplier.id} />
			</Modal>
			<Modal
				open={isOpen2}
				onClose={toggleModal2}
				aria-labelledby="modal-Register"
				aria-describedby="modal-Register"
			>
				<InventoryModal
					message={'Are you sure you want to delete this product?'}
					buttonText={'DELETE'}
					color={'error'}
					submit={deleteProduct}
				/>
			</Modal>
		</Box>
	);
}
