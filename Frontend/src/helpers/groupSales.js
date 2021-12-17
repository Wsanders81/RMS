import moment from 'moment';
import { getSales } from '../actions/actions';
export const groupSales = (salesArr) => {
	let foodSales = 0;
	let alcoholSales = 0;
	let beerSales = 0;
	let NAbevSales = 0;
	salesArr.map((saleItem) => {
		if (saleItem.category_name === 'food') {
			foodSales += saleItem.sales;
		}
		if (saleItem.category_name === 'alcohol') {
			alcoholSales += saleItem.sales;
		}
		if (saleItem.category_name === 'beer') {
			beerSales += saleItem.sales;
		}
		if (saleItem.category_name === 'NA Beverage') {
			NAbevSales += saleItem.sales;
		}
		return null;
	});

	return {
		foodSales,
		alcoholSales,
		beerSales,
		NAbevSales
	};
};

export const dailySales = (salesArr, day = null, i = 0) => {
	let daySales = [];

	for (let i = 0; i < salesArr.length; i++) {
		day = moment(salesArr[i].date).format('ddd');

		daySales[salesArr[i].date] = { ...daySales[salesArr[i].date] };
		daySales[salesArr[i].date][salesArr[i].category_name] =
			salesArr[i].sales;
	}

	return Object.entries(daySales);
};

export const calculatePercentage = (value, totalSales) => {
	return (value / totalSales * 100).toFixed(2);
};

export const currentWeekSales = async ({ sales }) => {
	var mondayTargetIndex;
	var targetDate;

	//** find index of first Monday */
	for (let i = sales.length - 1; i >= 0; i--) {
		const date = moment(sales[i].date).format('d');
		if (date === '1') {
			mondayTargetIndex =
				sales[i - 3].date === sales[i].date ? i - 3 : i - 2;
			targetDate = sales[i].date;
			break;
		}
	}

	const formattedDate = moment(targetDate).format('YYYY-MM-DD');
	const formattedEndDate = moment(targetDate)
		.add(6, 'days')
		.format('YYYY-MM-DD');
	const weeklySales = await getSales(formattedDate, formattedEndDate);
	const formattedWeeklySales = dailySales(weeklySales.sales);
	return {
		monday    : formattedWeeklySales[0][1],
		tuesday   : formattedWeeklySales[1][1],
		wednesday : formattedWeeklySales[2][1],
		thursday  : formattedWeeklySales[3][1],
		friday    : formattedWeeklySales[4][1],
		saturday  : formattedWeeklySales[5][1],
		sunday    : formattedWeeklySales[6][1]
		 
	};
};
