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
	let total = 0;
	const dailySalesBreakdown = Object.entries(weeklySales).map((day) => {
		const food = day[1].food ? day[1].food : 0;
		const alcohol = day[1].alcohol ? day[1].alcohol : 0;
		const beer = day[1].beer ? day[1].beer : 0;
		const NABev = day[1]['NA Beverage'] ? day[1]['NA Beverage'] : 0;

		total += food + alcohol + beer + NABev;
		return food + alcohol + beer + NABev;
	});
	const firstSeries = [
		{
			category   : categoryNames[0],
			value      : weeklySales.monday.food,
			percentage : (weeklySales.monday.food /
				dailySalesBreakdown[0] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[0],
			value      : weeklySales.tuesday.food,
			percentage : (weeklySales.tuesday.food /
				dailySalesBreakdown[1] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[0],
			value      : weeklySales.wednesday.food,
			percentage : (weeklySales.wednesday.food /
				dailySalesBreakdown[2] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[0],
			value      : weeklySales.thursday.food,
			percentage : (weeklySales.thursday.food /
				dailySalesBreakdown[3] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[0],
			value      : weeklySales.friday.food,
			percentage : (weeklySales.friday.food /
				dailySalesBreakdown[4] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[0],
			value      : weeklySales.saturday.food,
			percentage : (weeklySales.saturday.food /
				dailySalesBreakdown[5] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[0],
			value      : weeklySales.sunday.food,
			percentage : (weeklySales.sunday.food /
				dailySalesBreakdown[6] *
				100).toFixed(2)
		}
	];

	const secondSeries = [
		{
			category   : categoryNames[1],
			value      : weeklySales.monday.alcohol,
			percentage : (weeklySales.monday.alcohol /
				dailySalesBreakdown[0] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[1],
			value      : weeklySales.tuesday.alcohol,
			percentage : (weeklySales.tuesday.alcohol /
				dailySalesBreakdown[1] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[1],
			value      : weeklySales.wednesday.alcohol,
			percentage : (weeklySales.wednesday.alcohol /
				dailySalesBreakdown[2] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[1],
			value      : weeklySales.thursday.alcohol,
			percentage : (weeklySales.thursday.alcohol /
				dailySalesBreakdown[3] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[1],
			value      : weeklySales.friday.alcohol,
			percentage : (weeklySales.friday.alcohol /
				dailySalesBreakdown[4] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[1],
			value      : weeklySales.saturday.alcohol,
			percentage : (weeklySales.saturday.alcohol /
				dailySalesBreakdown[5] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[1],
			value      : weeklySales.sunday.alcohol,
			percentage : (weeklySales.sunday.alcohol /
				dailySalesBreakdown[6] *
				100).toFixed(2)
		}
	];
	const thirdSeries = [
		{
			category   : categoryNames[2],
			value      : weeklySales.monday.beer,
			percentage : (weeklySales.monday.beer /
				dailySalesBreakdown[0] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[2],
			value      : weeklySales.tuesday.beer,
			percentage : (weeklySales.tuesday.beer /
				dailySalesBreakdown[1] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[2],
			value      : weeklySales.wednesday.beer,
			percentage : (weeklySales.wednesday.beer /
				dailySalesBreakdown[2] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[2],
			value      : weeklySales.thursday.beer,
			percentage : (weeklySales.thursday.beer /
				dailySalesBreakdown[3] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[2],
			value      : weeklySales.friday.beer,
			percentage : (weeklySales.friday.beer /
				dailySalesBreakdown[4] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[2],
			value      : weeklySales.saturday.beer,
			percentage : (weeklySales.saturday.beer /
				dailySalesBreakdown[5] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[2],
			value      : weeklySales.sunday.beer,
			percentage : (weeklySales.sunday.beer /
				dailySalesBreakdown[6] *
				100).toFixed(2)
		}
	];
	const fourthSeries = [
		{
			category   : categoryNames[3],
			value      : weeklySales.monday['NA Beverage'],
			percentage : (weeklySales.monday['NA Beverage'] /
				dailySalesBreakdown[0] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[3],
			value      : weeklySales.tuesday['NA Beverage'],
			percentage : (weeklySales.tuesday['NA Beverage'] /
				dailySalesBreakdown[1] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[3],
			value      : weeklySales.wednesday['NA Beverage'],
			percentage : (weeklySales.wednesday['NA Beverage'] /
				dailySalesBreakdown[2] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[3],
			value      : weeklySales.thursday['NA Beverage'],
			percentage : (weeklySales.thursday['NA Beverage'] /
				dailySalesBreakdown[3] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[3],
			value      : weeklySales.friday['NA Beverage'],
			percentage : (weeklySales.friday['NA Beverage'] /
				dailySalesBreakdown[4] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[3],
			value      : weeklySales.saturday['NA Beverage'],
			percentage : (weeklySales.saturday['NA Beverage'] /
				dailySalesBreakdown[5] *
				100).toFixed(2)
		},
		{
			category   : categoryNames[3],
			value      : weeklySales.sunday['NA Beverage'],
			percentage : (weeklySales.sunday['NA Beverage'] /
				dailySalesBreakdown[6] *
				100).toFixed(2)
		}
	];
	const defaultTooltipRender = ({ point }) => {
		const index = point.categoryIndex;
		return `${point.series.data[0].category} $${point.value} / ${point
			.series.data[index].percentage}%`;
	};
	return (
		<Chart>
			<ChartTitle
				text={`Current Week Daily Sales \n Total: $${total.toLocaleString()} `}
			/>
			<ChartCategoryAxis>
				<ChartCategoryAxisItem categories={categories} />
			</ChartCategoryAxis>
			<ChartLegend position="bottom" orientation="horizontal" />
			<ChartTooltip render={defaultTooltipRender} position="top" />
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
