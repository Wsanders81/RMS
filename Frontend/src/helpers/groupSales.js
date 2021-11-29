
import moment from "moment";
export const groupSales = (salesArr) => {
	let foodSales = 0;
	let alcoholSales = 0;
	let beerSales = 0;
	let NAbevSales = 0;
	const groupedSales = salesArr.map((saleItem) => {
		if (saleItem.category_name === "food") {
			foodSales += saleItem.sales;
		}
		if (saleItem.category_name === "alcohol") {
			alcoholSales += saleItem.sales;
		}
		if (saleItem.category_name === "beer") {
			beerSales += saleItem.sales;
		}
		if (saleItem.category_name === "NA Beverage") {
			NAbevSales += saleItem.sales;
		}
	});
    
	return {
		foodSales,
		alcoholSales,
		beerSales,
		NAbevSales
	};
};

export const dailySales = (salesArr, day=null, i=0) => {
    let daySales = []
     
    for(let i = 0; i < salesArr.length; i++){
    day = moment(salesArr[i].date).format("ddd")

    daySales[salesArr[i].date] = {...daySales[salesArr[i].date]}
    daySales[salesArr[i].date][salesArr[i].category_name] = salesArr[i].sales
    
    }
	
       
     return Object.entries(daySales)
}
