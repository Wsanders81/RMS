import {
	Chart,
	ChartLegend,
	ChartSeries,
	ChartSeriesItem,
	ChartTitle
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
const returnCategoryName = (array) => {
	let nameArray = [];
	for (let name of array) {
		const formattedName = name.replace('Sales', '');
		const capitalizedName =
			formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
		nameArray.push(capitalizedName);
	}
	return nameArray;
};
const PieChart = ({ sales }) => {
	const categoryNames = returnCategoryName(Object.keys(sales));

	const series = [
		{
			category : categoryNames[0],
			value    : sales.foodSales
		},
		{
			category : categoryNames[1],
			value    : sales.alcoholSales
		},
		{
			category : categoryNames[2],
			value    : sales.beerSales
		},
		{
			category : categoryNames[3],
			value    : sales.NAbevSales
		}
	];
	
	const labelContent = (props) => {
        let formatedNumber = Number(
            props.dataItem.value
            ).toLocaleString(undefined, {
                // style                 : 'percent',
                minimumFractionDigits : 2
            });
            
            return `${props.dataItem.category} Sales: ${formatedNumber}`;
	};

	return (
		<Chart>
			<ChartTitle text="World Population by Broad Age Groups" />
			<ChartLegend position="bottom" />
			<ChartSeries>
				<ChartSeriesItem
					type="pie"
					data={series}
					field="value"
					categoryField="category"
					labels={{
						visible : true,
						content : labelContent
					}}
				/>
			</ChartSeries>
		</Chart>
	);
};

export default PieChart;
