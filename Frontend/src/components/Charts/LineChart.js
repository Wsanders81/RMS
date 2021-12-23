import React from 'react';
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

const NonMemoizedChart = ({ sales }) => {
	dates.length = 0;
	foodData.length = 0;
	alcoholData.length = 0;
	beerData.length = 0;
	NABevData.length = 0;
	sales.map((saleItem) => {
		dates.push(moment(saleItem[0]).format('MM-DD'));
		foodData.push(saleItem[1].food);
		alcoholData.push(saleItem[1].alcohol);
		beerData.push(saleItem[1].beer);
		NABevData.push(saleItem[1]['NA Beverage']);
		return null;
	});
	const defaultTooltipRender = ({ point }) => {
		return `$${point.value.toLocaleString()}`;
	};
	return (
		<Chart>
			<ChartTitle
				className="Chart-title"
				text={`Trailing 15 Day Sales Trend `}
			/>
			<ChartCategoryAxis>
				<ChartCategoryAxisItem
					categories={window.screen.width > 768 ? dates : []}
				/>
			</ChartCategoryAxis>
			<ChartLegend position="bottom" orientation="horizontal" />
			<ChartTooltip render={defaultTooltipRender} position="top" />
			<ChartSeries>
				<ChartSeriesItemTooltip format="Series value {1}" />
				<ChartSeriesItem
					name="Food Sales"
					type="line"
					data={foodData}
					autoF
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
const LineChart = React.memo(NonMemoizedChart);
export default LineChart;
