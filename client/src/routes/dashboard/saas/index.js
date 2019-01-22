/**
 * Agency Dashboard
 */
import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {
	OverallTrafficStatusWidget,
	TotalSalesWidget,
	NetProfitWidget,
	TaxStatsWidget,
	ExpensesWidget,
	ProjectManagement,
	ProjectTaskManagement,
	SupportRequest,
	CampaignPerformance,
	UserProfile,
	StockExchange,
	QuoteOFTheDay,
	WeatherWidgetV2
} from "Components/Widgets";

// widgets data
import {
	trafficStatus,
	totalSales,
	netProfit,
	expenses,
	taxStats
} from './data';

export default class saasDashbaord extends Component {
	render() {
		const { match } = this.props;
		return (
			<div className="saas-dashboard">
				<Helmet>
					<title>Sass Dashboard</title>
					<meta name="description" content="Reactify Sass Dashboard" />
				</Helmet>
				<PageTitleBar title={<IntlMessages id="sidebar.saas" />} match={match} />
				<div className="row">
					<RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-6 col-lg-6 w-xs-full"
						heading={<IntlMessages id="widgets.overallTrafficStatus" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<OverallTrafficStatusWidget
							chartData={trafficStatus}
						/>
					</RctCollapsibleCard>
					<div className="col-sm-12 col-md-6 col-lg-6 w-xs-full">
						<div className="row">
							<div className="col-sm-6 col-md-6">
								<TotalSalesWidget
									label={totalSales.label}
									chartdata={totalSales.chartdata}
									labels={totalSales.labels}
								/>
							</div>
							<div className="col-sm-6 col-md-6">
								<NetProfitWidget
									label={netProfit.label}
									chartdata={netProfit.chartdata}
									labels={netProfit.labels}
								/>
							</div>
							<div className="col-sm-6 col-md-6">
								<TaxStatsWidget
									label={taxStats.label}
									chartdata={taxStats.chartdata}
									labels={taxStats.labels}
								/>
							</div>
							<div className="col-sm-6 col-md-6">
								<ExpensesWidget
									label={expenses.label}
									chartdata={expenses.chartdata}
									labels={expenses.labels}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-half-block"
						heading={<IntlMessages id="widgets.campaignPerformance" />}
						collapsible
						reloadable
						closeable
					>
						<CampaignPerformance />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-4 col-lg-4 w-xs-half-block"
						fullBlock
						customClasses="overflow-hidden"
					>
						<UserProfile />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-4 col-lg-4 w-xs-full"
						heading={<IntlMessages id="widgets.supportRequest" />}
						collapsible
						reloadable
						closeable
						fullBlock
						customClasses="overflow-hidden"
					>
						<SupportRequest />
					</RctCollapsibleCard>
				</div>
				<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-4 col-lg-4 w-xs-half-block"
						heading={<IntlMessages id="widgets.quoteOfTheDay" />}
						customClasses="review-slider overflow-hidden bg-primary text-white"
					>
						<QuoteOFTheDay />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-4 col-lg-4 w-xs-half-block"
						heading={<IntlMessages id="widgets.stockExchange" />}
						collapsible
						reloadable
						closeable
						fullBlock
						customClasses="overflow-hidden"
					>
						<StockExchange />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-4 col-lg-4 w-xs-full"
						fullBlock
					>
						<WeatherWidgetV2 />
					</RctCollapsibleCard>
				</div>
				<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-6 d-xxs-full"
						heading={<IntlMessages id="widgets.projectManagement" />}
						collapsible
						reloadable
						closeable
						fullBlock
						customClasses="overflow-hidden"
						badge={{
							name: <IntlMessages id="widgets.weekly" />,
							class: 'success'
						}}
					>
						<ProjectManagement />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-6 d-xxs-full"
						heading={<IntlMessages id="widgets.projectTaskManagement" />}
						collapsible
						reloadable
						closeable
						fullBlock
						customClasses="overflow-hidden"
						badge={{
							name: <IntlMessages id="widgets.weekly" />,
							class: 'danger'
						}}
					>
						<ProjectTaskManagement />
					</RctCollapsibleCard>
				</div>
			</div>
		)
	}
}
