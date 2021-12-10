import { Routes, Route } from 'react-router-dom';
import FourOhFour from './FourOhFour';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Sales from './Sales';
import POS from './POS'
import Inventories from './Inventories'
import Orders from './Orders'
import MenuItems from './MenuItems'
import Suppliers from './Suppliers'
import Supplier from './Supplier'
import PrivateRoute from './ProtectedRoutes';
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

			<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

			<Route path="/sales" element={<PrivateRoute><Sales/></PrivateRoute>} />
            <Route path ="/pos" element={<PrivateRoute><POS/></PrivateRoute>}/>
            <Route path ="/inventory" element={<PrivateRoute><Inventories/></PrivateRoute>}/>
            <Route path ="/orders" element={<PrivateRoute><Orders/></PrivateRoute>}/>
            <Route path ="/menu-items" element={<PrivateRoute><MenuItems/></PrivateRoute>}/>
            <Route path ="/suppliers" element={<PrivateRoute><Suppliers/></PrivateRoute>}/>
            <Route path ="/suppliers/:id" element={<PrivateRoute><Supplier/></PrivateRoute>}/>
		</Routes>
	);
}
