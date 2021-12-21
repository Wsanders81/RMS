import {
	Chart,
	ChartSeries,
	ChartSeriesItem,
	ChartCategoryAxis,
	ChartCategoryAxisItem,
	ChartLegend,
	ChartSeriesItemTooltip,
	ChartTooltip,
	ChartTitle
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import moment from 'moment';

//categories = days of week
const dates = [];
const foodData = [];
const alcoholData = [];
const beerData = [];
const NABevData = [];

const LineChart = ({ sales }) => {
	sales.map((saleItem) => {
		dates.push(moment(saleItem[0]).format('MM-DD'));

		foodData.push(saleItem[1].food);
		alcoholData.push(saleItem[1].alcohol);
		beerData.push(saleItem[1].beer);
		NABevData.push(saleItem[1]['NA Beverage']);
		return null;
	});
	const defaultTooltipRender = ({ point }) => {
		const index = point.categoryIndex;
		return `$${point.value.toLocaleString()}`;
	};
	return (
		<Chart>
			<ChartTitle text={`Trailing 15 Day Sales Trend `} />
			<ChartCategoryAxis>
				<ChartCategoryAxisItem categories={dates} />
			</ChartCategoryAxis>
			<ChartLegend position="bottom" orientation="horizontal" />
			<ChartTooltip render={defaultTooltipRender} position="top" />
			<ChartSeries>
				<ChartSeriesItemTooltip format="Series value {1}" />
				<ChartSeriesItem
					name="Food Sales"
					type="line"
					data={foodData}
				/>
				<ChartSeriesItem
					name="Alcohol Sales"
					type="line"
					data={alcoholData}
				/>
				<ChartSeriesItem
					name="Beer Sales"
					type="line"
					data={beerData}
				/>
				<ChartSeriesItem
					name="NA Bev Sales"
					type="line"
					data={NABevData}
				/>
			</ChartSeries>
		</Chart>
	);
};
export default LineChart;
