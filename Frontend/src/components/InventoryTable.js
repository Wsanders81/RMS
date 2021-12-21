import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import React from 'react';
import '../styles/Inventories.css';
export default function InventoryTable({
	inventory,
	removeInv,
	setInv,
	toggleInvButtons
}) {
	const user = useSelector((store) => store.userReducer);

	const totals = {
		food    : 0,
		alcohol : 0,
		beer    : 0,
		NABev   : 0
	};
	const { beg_food, beg_alcohol, beg_beer, beg_na_bev } = inventory.inventory;
	const {
		food_sales,
		beer_sales,
		alcohol_sales,
		na_bev_sales
	} = inventory.inventory;
	const FoodPurchases = inventory.inventory.Purchases.Food.amount;
	const AlcoholPurchases = inventory.inventory.Purchases.Alcohol.amount;
	const BeerPurchases = inventory.inventory.Purchases.Beer.amount;
	const NABevPurchases = inventory.inventory.Purchases.NABev.amount;
	const calculateCost = (begInv, endInv, purchases, sales) => {
		return ((begInv + purchases - endInv) / sales * 100).toFixed(2);
	};
	const calculateTotalCost = () => {
		const totalBeginningInventory =
			beg_food + beg_alcohol + beg_beer + beg_na_bev;
		const totalPurchases =
			FoodPurchases + AlcoholPurchases + BeerPurchases + NABevPurchases;
		const totalEndingInventory =
			totals.food + totals.alcohol + totals.beer + totals.NABev;
		const totalSales =
			food_sales + alcohol_sales + beer_sales + na_bev_sales;
		const totalCostOfGoods =
			(totalBeginningInventory + totalPurchases - totalEndingInventory) /
			totalSales *
			100;
		return totalCostOfGoods.toFixed(2);
	};

	const handleClick = () => {
		setInv(null);
		toggleInvButtons();
	};

	const createCategory = (catName) => {
		return (
			<React.Fragment>
				<thead className="table-light">
					<tr>
						<th colSpan="6">{`${catName.charAt(0).toUpperCase() +
							catName.slice(1)}`}</th>
					</tr>
					<tr>
						<th>Product Name</th>
						<th>Unit</th>
						<th>Price</th>
						<th>Qty On Hand</th>
						<th colSpan="2">Extended Value</th>
					</tr>
				</thead>
				<tbody>
					{inventory.inventory[catName].map((item) => {
						if (item.quantity === 0) return null;
						totals[catName] += parseInt(item.price) * item.quantity;
						return (
							<tr key={item.id} className="InventoryTable-list">
								<td>{item.product_name}</td>
								<td>{item.unit}</td>
								<td>{item.price}</td>
								<td>{item.quantity}</td>
								<td colSpan="2">
									{item.quantity * item.price}
								</td>
							</tr>
						);
					})}
					<tr>
						<th colSpan="6">{`Total ${catName
							.charAt(0)
							.toUpperCase() +
							catName.slice(1)} inventory : $${totals[
							catName
						]}`}</th>
					</tr>
				</tbody>
			</React.Fragment>
		);
	};

	return (
		<div className="container-fluid">
			{user.isAdmin === 'true' ? (
				<Button
					onClick={removeInv}
					sx={{ margin: '1rem 1rem 1rem 0' }}
					variant="outlined"
					color="error"
				>
					DELETE INVENTORY
				</Button>
			) : null}
			<Button
				sx={{ margin: '1rem 0 1rem 0' }}
				variant="outlined"
				color="error"
				onClick={handleClick}
			>
				go back
			</Button>
			<table className="table">
				<thead className="table-light">
					<tr>
						<th />
						<th>Food</th>
						<th>Beer</th>
						<th>Alcohol</th>
						<th>NA Bev</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Sales</td>
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
					<tr>
						<td>Purchases</td>

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
					<tr>
						<td>Beginning Inventory</td>
						<td>${beg_food}</td>
						<td>${beg_alcohol}</td>
						<td>${beg_beer}</td>
						<td>${beg_na_bev}</td>
						<td>
							${beg_food + beg_alcohol + beg_beer + beg_na_bev}
						</td>
					</tr>
					<tr>
						<td>COGS</td>
						<td>
							{calculateCost(
								beg_food,
								totals.food,
								FoodPurchases,
								food_sales
							)}%
						</td>
						<td>
							{calculateCost(
								beg_alcohol,
								totals.alcohol,
								AlcoholPurchases,
								alcohol_sales
							)}%
						</td>
						<td>
							{calculateCost(
								beg_beer,
								totals.beer,
								BeerPurchases,
								beer_sales
							)}%
						</td>
						<td>
							{calculateCost(
								beg_na_bev,
								totals.NABev,
								NABevPurchases,
								na_bev_sales
							)}%
						</td>
						<td>{calculateTotalCost()}%</td>
					</tr>
				</tbody>

				{createCategory('food')}
				{createCategory('alcohol')}
				{createCategory('beer')}
				{createCategory('NABev')}
			</table>
		</div>
	);
}
