import { Routes, Route } from 'react-router-dom';
import FourOhFour from './FourOhFour';
import { useSelector } from 'react-redux';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Sales from './Sales';
import POS from './POS'
import Inventories from './Inventories'
import Orders from './Orders'
import MenuItems from './MenuItems'
import Suppliers from './Suppliers'
import Supplier from './Supplier'
export default function UserRoutes({
	toggleModal,
	open,
	toggleModalTwo,
	openTwo
}) {
	return (
		<Routes>
			<Route path="*" element={<FourOhFour />} />
			<Route
				path="/"
				element={
					<LandingPage
						toggleModal={toggleModal}
						open={open}
						toggleModalTwo={toggleModalTwo}
						openTwo={openTwo}
					/>
				}
			/>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/sales" element={<Sales />} />
            <Route path ="/pos" element={<POS/>}/>
            <Route path ="/inventory" element={<Inventories/>}/>
            <Route path ="/orders" element={<Orders/>}/>
            <Route path ="/menu-items" element={<MenuItems/>}/>
            <Route path ="/suppliers" element={<Suppliers/>}/>
            <Route path ="/suppliers/:id" element={<Supplier/>}/>
		</Routes>
	);
}
