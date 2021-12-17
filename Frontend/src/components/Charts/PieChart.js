import {
	Chart,
	ChartLegend,
	ChartSeries,
	ChartSeriesItem,
	ChartTitle
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';
import '../../styles/PieChart.css';
import 'hammerjs';
import { returnCategoryName } from '../../helpers/categoryNames';
import { calculatePercentage } from '../../helpers/groupSales';
const PieChart = ({ sales, begDate, endDate }) => {
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
	const totalSales =
		sales.foodSales +
		sales.alcoholSales +
		sales.beerSales +
		sales.NAbevSales;
	const labelContent = (props) => {
		let formatedNumber = Number(
			props.dataItem.value
		).toLocaleString(undefined, {
			// style                 : 'percent',
			minimumFractionDigits : 2
		});

		return `${props.dataItem
			.category} Sales: $${formatedNumber} / ${calculatePercentage(
			props.dataItem.value,
			totalSales
		)}%`;
	};
	return (
		<Chart className="PieChart">
			<ChartTitle
				text={`Category Sales ${begDate} -> ${endDate} \n Total sales : $${totalSales.toLocaleString()}`}
			/>

			<ChartLegend position="bottom" />
			<ChartSeries>
				<ChartSeriesItem
					type="pie"
					data={series}
					field="value"
					autoFit
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
