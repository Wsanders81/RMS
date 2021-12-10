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
	const {beg_food, beg_alcohol, beg_beer, beg_na_bev} = inventory.inventory
	const {food_sales, beer_sales, alcohol_sales, na_bev_sales} = inventory.inventory
	const FoodPurchases = inventory.inventory.Purchases.Food.amount
	const AlcoholPurchases = inventory.inventory.Purchases.Alcohol.amount
	const BeerPurchases = inventory.inventory.Purchases.Beer.amount
	const NABevPurchases = inventory.inventory.Purchases.NABev.amount
	
    const calculateCost = (begInv, endInv, purchases, sales) => {
		return ((begInv + purchases - endInv)/sales)*100
	}
	const calculateTotalCost = () => {
		const totalBeginningInventory = beg_food + beg_alcohol + beg_beer + beg_na_bev; 
		const totalPurchases = FoodPurchases + AlcoholPurchases + BeerPurchases + NABevPurchases; 
		const totalEndingInventory = totals.food + totals.alcohol + totals.beer + totals.NABev; 
		const totalSales = food_sales + alcohol_sales + beer_sales + na_bev_sales; 
		const totalCostOfGoods = ((totalBeginningInventory + totalPurchases - totalEndingInventory)/totalSales)*100
		return totalCostOfGoods.toFixed(2)
	}
    const createCategory = (catName) => {
        return (
            <>
            
            <thead className="table-light">
                
                <tr>
                    <th  colSpan="6" >{`${catName.charAt(0).toUpperCase() + catName.slice(1)}`}</th>
                </tr>
				<tr>
					<th>Product Name</th>
					<th>Unit</th>
					<th>Price</th>
					<th>Qty On Hand</th>
					<th colSpan="2">Extended Value</th>
				</tr>
			</thead>
			<tbody >
				{inventory.inventory[catName].map((item) => {
                    if(item.quantity === 0) return null
                    totals[catName] += (parseInt(item.price)*item.quantity)
					return (
						<tr key={item.id} className="InventoryTable-list">
							<td>{item.product_name}</td>
							<td>{item.unit}</td>
							<td>{item.price}</td>
							<td>{item.quantity}</td>
							<td colSpan="2">{item.quantity * item.price}</td>
						</tr>
					);
				})}
                <tr>
                    <th colSpan="6">{`Total ${catName.charAt(0).toUpperCase() + catName.slice(1)} inventory : $${totals[catName]}`}</th>
                </tr>
			</tbody>
            </>
        )
    }
    
    return (
        <>
        {user.isAdmin === "true" ? <Button onClick={removeInv} sx={{marginTop: "1rem"}} variant="outlined" color="error">DELETE INVENTORY</Button> : null}
        <table className="table ">
			<thead className="table-light">
            <tr>
                    <th  colSpan="6" >Sales</th>
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
					<td>${food_sales}</td>
					<td>${beer_sales}</td>
					<td>${alcohol_sales}</td>
					<td>${na_bev_sales}</td>
					<td>
						${food_sales +
							beer_sales +
							alcohol_sales +
							na_bev_sales}
					</td>
				</tr>
			</tbody>
			<thead className="table-light">
            <tr>
                    <th  colSpan="6" >Purchases</th>
                </tr>
				<tr>
					<th></th>
					<th>Food Purchases</th>
					<th>Beer Purchases</th>
					<th>Alcohol Purchases</th>
					<th>NA Bev Purchases</th>
					<th>Total Purchases</th>
				</tr>
			</thead>
			
			<tbody>
				<tr>
					<td>
						
					</td>
					<td>${FoodPurchases}</td>
					<td>${AlcoholPurchases}</td>
					<td>${BeerPurchases}</td>
					<td>${NABevPurchases}</td>
					<td>
						${FoodPurchases +
							AlcoholPurchases +
							BeerPurchases +
							NABevPurchases}
					</td>
				</tr>
			</tbody>
			<thead className="table-light">
            <tr>
                    <th  colSpan="6" >Beginning Inventory</th>
                </tr>
				<tr>
					<th></th>
					<th>Food Inventory</th>
					<th>Beer Inventory</th>
					<th>Alcohol Inventory</th>
					<th>NA Bev Inventory</th>
					<th>Total Inventory</th>
				</tr>
			</thead>
			
			<tbody>
				<tr>
					<td>
						
					</td>
					<td>${beg_food}</td>
					<td>${beg_alcohol}</td>
					<td>${beg_beer}</td>
					<td>${beg_na_bev}</td>
					<td>
						${beg_food +
							beg_alcohol +
							beg_beer +
							beg_na_bev}
					</td>
				</tr>
			</tbody>
			<thead className="table-light">
            <tr>
                    <th  colSpan="6" >Cost of Goods</th>
                </tr>
				<tr>
					<th></th>
					<th>Food COGS</th>
					<th>Beer COGS</th>
					<th>Alcohol COGS</th>
					<th>NA Bev COGS</th>
					<th>Total COGS</th>
				</tr>
			</thead>
			
			<tbody>
				<tr>
					<td>
						
					</td>
					<td>{calculateCost(beg_food, totals.food, FoodPurchases ,food_sales)}%</td>
					<td>{calculateCost(beg_alcohol, totals.alcohol, AlcoholPurchases ,alcohol_sales)}%</td>
					<td>{calculateCost(beg_beer, totals.beer, BeerPurchases ,beer_sales)}%</td>
					<td>{calculateCost(beg_na_bev, totals.NABev, NABevPurchases ,na_bev_sales)}%</td>
					<td>{calculateTotalCost()}%</td>
					
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