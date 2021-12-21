import { Box, Button, Modal, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef, Fragment } from 'react';
import {
	getSupplierProducts,
	addSupplierProduct,
	deleteSupplierProduct,
	deleteSupplier,
	getSupplier
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
	const [ loading, setLoading ] = useState(true);
	let backupSupplier = useRef(null);
	const supplier =
		useSelector((store) => store.supplierReducer)[id] ||
		backupSupplier.current;
	const user = useSelector((store) => store.userReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log(backupSupplier.current);

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
	useEffect(
		() => {
			const getSupplierById = async function() {
				const supplier = await getSupplier(id);

				backupSupplier.current = supplier.supplier;
				setLoading(false);
			};
			getSupplierById();
		},
		[ id ]
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

	const deleteSelectedSupplier = async () => {
		const res = await deleteSupplier(supplier.id);
		if (res) {
			dispatch({
				type         : ALERT,
				typeOfNotify : 'success',
				message      : 'Supplier successfully deleted'
			});
			navigate('/suppliers');
		}
	};
	if (loading) return <h1>...Loading</h1>;
	return (
		<Box className="Suppliers">
			<Box>
				<Button
					color="error"
					variant="outlined"
					onClick={() => navigate('/suppliers')}
				>
					Back To Suppliers
				</Button>
			</Box>
			{user.isAdmin === 'true' ? (
				<Fragment>
					<Button onClick={toggleModal}>Add Products</Button>
					<Button onClick={deleteSelectedSupplier}>
						Delete supplier
					</Button>
				</Fragment>
			) : null}
			<h3 className="Supplier-name">{supplier.name}</h3>
			<p className="Supplier-detail">Address: {supplier.address}</p>
			<p className="Supplier-detail">Phone: {supplier.phone}</p>
			<p className="Supplier-detail">Email: {supplier.email}</p>
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
