import moment from 'moment'
import {Button} from '@mui/material'
import { useSelector } from 'react-redux'
import '../styles/Inventories.css'
export default function InventoryTable ({inventory, removeInv}) {
    const user = useSelector(store => store.userReducer)
    
    const totals = {
        food: 0, 
        alcohol: 0, 
        beer: 0,
        NABev: 0
    }
    
    const createCategory = (catName) => {
        return (
            <>
            
            <thead>
                
                <tr>
                    <th  colspan="6" >{`${catName.charAt(0).toUpperCase() + catName.slice(1)}`}</th>
                </tr>
				<tr>
					<th>Product Name</th>
					<th>Unit</th>
					<th>Price</th>
					<th>Qty On Hand</th>
					<th colspan="2">Extended Cost</th>
				</tr>
			</thead>
			<tbody>
				{inventory.inventory[catName].map((item) => {
                    if(item.quantity === 0) return 
                    totals[catName] += (parseInt(item.price)*item.quantity)
					return (
						<tr key={item.id}>
							<td>{item.product_name}</td>
							<td>{item.unit}</td>
							<td>{item.price}</td>
							<td>{item.quantity}</td>
							<td colspan="2">{item.quantity * item.price}</td>
						</tr>
					);
				})}
                <tr>
                    <th colspan="6">{`Total ${catName.charAt(0).toUpperCase() + catName.slice(1)} inventory : $${totals[catName]}`}</th>
                </tr>
			</tbody>
            </>
        )
    }
    
    return (
        <>
        {user.isAdmin === "true" ? <Button onClick={removeInv} sx={{marginTop: "1rem"}} variant="outlined" color="error">DELETE INVENTORY</Button> : null}
        <table className="table table-striped">
			<thead>
            <tr>
                    <th  colspan="6" >Sales</th>
                </tr>
				<tr>
					<th>Date</th>
					<th>Food Sales</th>
					<th>Beer Sales</th>
					<th>Alcohol Sales</th>
					<th>NA Bev Sales</th>
					<th>Total Sales</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						{moment(inventory.inventory.date).format(
							'ddd MMM DD YY'
						)}
					</td>
					<td>${inventory.inventory.food_sales}</td>
					<td>${inventory.inventory.beer_sales}</td>
					<td>${inventory.inventory.alcohol_sales}</td>
					<td>${inventory.inventory.na_bev_sales}</td>
					<td>
						${inventory.inventory.food_sales +
							inventory.inventory.beer_sales +
							inventory.inventory.alcohol_sales +
							inventory.inventory.na_bev_sales}
					</td>
				</tr>
			</tbody>
            {createCategory('food')}
            {createCategory('alcohol')}
            {createCategory('beer')}
            {createCategory('NABev')}
			
		</table>
        </>
    )
}