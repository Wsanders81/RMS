import {
	Chart,
	ChartSeries,
	ChartSeriesItem,
	ChartTitle,
	ChartCategoryAxis,
	ChartCategoryAxisItem,
	ChartLegend,
	ChartSeriesItemTooltip,
	ChartTooltip
} from '@progress/kendo-react-charts';
import 'hammerjs';
import '@progress/kendo-theme-default/dist/all.css';
const BarChart = ({ weeklySales }) => {
	const categories = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
	const categoryNames = [ 'Food', 'Alcohol', 'Beer', 'NA Beverage' ];
	const firstSeries = [
		{
			category : categoryNames[0],
			value    : weeklySales.monday.food
		},
		{
			category : categoryNames[0],
			value    : weeklySales.tuesday.food
		},
		{
			category : categoryNames[0],
			value    : weeklySales.wednesday.food
		},
		{
			category : categoryNames[0],
			value    : weeklySales.thursday.food
		},
		{
			category : categoryNames[0],
			value    : weeklySales.friday.food
		},
		{
			category : categoryNames[0],
			value    : weeklySales.saturday.food
		},
		{
			category : categoryNames[0],
			value    : weeklySales.sunday.food
		}
	];

	const secondSeries = [
		{
			category : categoryNames[1],
			value    : weeklySales.monday.alcohol
		},
		{
			category : categoryNames[1],
			value    : weeklySales.tuesday.alcohol
		},
		{
			category : categoryNames[1],
			value    : weeklySales.wednesday.alcohol
		},
		{
			category : categoryNames[1],
			value    : weeklySales.thursday.alcohol
		},
		{
			category : categoryNames[1],
			value    : weeklySales.friday.alcohol
		},
		{
			category : categoryNames[1],
			value    : weeklySales.saturday.alcohol
		},
		{
			category : categoryNames[1],
			value    : weeklySales.sunday.alcohol
		}
	];
	const thirdSeries = [
		{
			category : categoryNames[2],
			value    : weeklySales.monday.beer
		},
		{
			category : categoryNames[2],
			value    : weeklySales.tuesday.beer
		},
		{
			category : categoryNames[2],
			value    : weeklySales.wednesday.beer
		},
		{
			category : categoryNames[2],
			value    : weeklySales.thursday.beer
		},
		{
			category : categoryNames[2],
			value    : weeklySales.friday.beer
		},
		{
			category : categoryNames[2],
			value    : weeklySales.saturday.beer
		},
		{
			category : categoryNames[2],
			value    : weeklySales.sunday.beer
		}
	];
	const fourthSeries = [
		{
			category : categoryNames[3],
			value    : weeklySales.monday['NA Beverage']
		},
		{
			category : categoryNames[3],
			value    : weeklySales.tuesday['NA Beverage']
		},
		{
			category : categoryNames[3],
			value    : weeklySales.wednesday['NA Beverage']
		},
		{
			category : categoryNames[3],
			value    : weeklySales.thursday['NA Beverage']
		},
		{
			category : categoryNames[3],
			value    : weeklySales.friday['NA Beverage']
		},
		{
			category : categoryNames[3],
			value    : weeklySales.saturday['NA Beverage']
		},
		{
			category : categoryNames[3],
			value    : weeklySales.sunday['NA Beverage']
		}
	];
	const defaultTooltipRender = ({ point }) => {
		return `${point.series.data[0].category} $${point.value}`;
	};
	return (
		<Chart>
			<ChartTitle text={`Current Week Daily Sales`} />
			<ChartCategoryAxis>
				<ChartCategoryAxisItem categories={categories} />
			</ChartCategoryAxis>
			<ChartLegend position="bottom" orientation="horizontal" />
			<ChartTooltip render={defaultTooltipRender} />
			<ChartSeries>
				<ChartSeriesItem
					name="Food"
					type="column"
					stack={{ type: 'normal' }}
					data={firstSeries}
				/>
				<ChartSeriesItemTooltip format="Series value {1}" />
				<ChartSeriesItem
					name="Alcohol"
					type="bar"
					data={secondSeries}
				/>
				<ChartSeriesItem name="Beer" type="bar" data={thirdSeries} />
				<ChartSeriesItem name="NAbev" type="bar" data={fourthSeries} />
			</ChartSeries>
		</Chart>
	);
};

export default BarChart;
