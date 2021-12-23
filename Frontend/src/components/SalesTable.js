import moment from 'moment';
export default function SalesTable({ daySales, totalSales, begDate, endDate }) {
	return (
		<table className="table table-light table-striped SalesTable">
			<thead>
				<tr>
					<th colSpan="6">Total Sales</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Dates</td>
					<td>Food</td>
					<td>Alcohol</td>
					<td>Beer</td>
					<td>NA Beverage</td>
					<td>Total</td>
				</tr>
				<tr>
					<td>
						{`${moment(begDate).format('MM-DD-YY')} - ${moment(
							endDate
						).format('MM-DD-YY')}`}
					</td>
					<td>{`$${totalSales.foodSales.toLocaleString()}`}</td>
					<td>{`$${totalSales.alcoholSales.toLocaleString()}`}</td>
					<td>{`$${totalSales.beerSales.toLocaleString()}`}</td>
					<td>{`$${totalSales.NAbevSales.toLocaleString()}`}</td>
					<td>
						${(totalSales.foodSales +
							totalSales.alcoholSales +
							totalSales.beerSales +
							totalSales.NAbevSales).toLocaleString()}
					</td>
				</tr>
			</tbody>
			<thead>
				<tr>
					<th colSpan="6">Daily Breakdown</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Date</td>
					<td>Food</td>
					<td>Alcohol</td>
					<td>Beer</td>
					<td>NA Beverage</td>
					<td>Total</td>
				</tr>
				{daySales.map((day) => {
					const foodSales = day[1].food ? day[1].food : 0;
					const alcoholSales = day[1].alcohol ? day[1].alcohol : 0;
					const beerSales = day[1].beer ? day[1].beer : 0;
					const NABevSales = day[1].NABev ? day[1].NABev : 0;
					const total =
						foodSales + alcoholSales + beerSales + NABevSales;
					return (
						<tr>
							<td>{moment(day[0]).format('ddd MMM DD YYYY')}</td>
							<td>${foodSales.toLocaleString()}</td>
							<td>${alcoholSales.toLocaleString()}</td>
							<td>${beerSales.toLocaleString()}</td>
							<td>${NABevSales.toLocaleString()}</td>
							<td>${total.toLocaleString()}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
