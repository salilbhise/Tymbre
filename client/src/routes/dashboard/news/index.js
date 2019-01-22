/**
 * News Dashboard
 */

import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

//Widgets
import {
	TrendingNews,
	TopHeadlines,
	Visitors,
	Subscribers,
	NewslaterCampaign,
	CommentsWidget,
	SocialFeedsWidget,
	TopAuthors,
	RecentActivity,
	TopNews,
	TwitterFeedsV2,
	Notifications
} from "Components/Widgets";

// widgets data
import {
	newsVisitorsData,
	newslaterCampaignData
} from './data';

export default class NewsDashboard extends Component {
	render() {
		return (
			<div className="news-dashboard-wrapper">
				<Helmet>
					<title>News Dashboard</title>
					<meta name="description" content="Reactify News Dashboard" />
				</Helmet>
				<TrendingNews />
				<div className="row">
					<RctCollapsibleCard
						heading="Top Headlines"
						colClasses="col-sm-12 col-md-12 col-lg-8"
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<TopHeadlines />
					</RctCollapsibleCard>
					<div className="col-sm-12 col-md-12 col-lg-4">
						<div className="row">
							<RctCollapsibleCard
								heading="Visitors"
								colClasses="col-sm-6 col-md-6 col-lg-12"
								customClasses="visitors-widget flex-chart"
								contentCustomClasses="justify-space-between"
							>
								<Visitors
									chartData={newsVisitorsData}
								/>
							</RctCollapsibleCard>
							<RctCollapsibleCard
								heading="Subscribers"
								colClasses="col-sm-6 col-md-6 col-lg-12"
								customClasses="subscribers-widget flex-chart"
								contentCustomClasses="justify-content-end"
							>
								<Subscribers />
							</RctCollapsibleCard>
						</div>
					</div>
				</div>
				<div className="row">
					<RctCollapsibleCard
						heading="Newslater Campaign"
						colClasses="col-sm-12 col-md-12 col-lg-6"
						customClasses="flex-chart newslater-widget"
						contentCustomClasses="justify-content-end"
					>
						<NewslaterCampaign
							chartData={newslaterCampaignData}
						/>
					</RctCollapsibleCard>
					<RctCollapsibleCard
						heading="Recent Comments"
						colClasses="col-sm-12 col-md-12 col-lg-6"
						contentCustomClasses="comment-section"
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<CommentsWidget />
					</RctCollapsibleCard>
				</div>
				<div className="row">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<SocialFeedsWidget
							type="facebook"
							friendsCount="89k"
							icon="zmdi zmdi-facebook"
							feedsCount="459"
						/>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<SocialFeedsWidget
							type="twitter"
							friendsCount="89k"
							feedsCount="459"
							icon="zmdi zmdi-twitter"
						/>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<SocialFeedsWidget
							type="linkedin"
							friendsCount="89k"
							feedsCount="459"
							icon="zmdi zmdi-linkedin"
						/>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<SocialFeedsWidget
							type="google"
							friendsCount="89k"
							feedsCount="459"
							icon="zmdi zmdi-google"
						/>
					</div>
				</div>
				<div className="row">
					<RctCollapsibleCard
						heading="Recent Activity"
						colClasses="col-sm-12 col-md-12 col-lg-4"
					>
						<RecentActivity />
					</RctCollapsibleCard>
					<div className="col-sm-12 col-md-12 col-lg-8">
						<TopNews />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6 col-md-6 col-lg-4">
						<TopAuthors />
					</div>
					<RctCollapsibleCard
						heading="Twitter Feeds"
						colClasses="col-sm-6 col-md-6 col-lg-4"
						customClasses="twitter-feeds-widget"
					>
						<TwitterFeedsV2 />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-4"
						fullBlock
						customClasses="overflow-hidden"
					>
						<Notifications />
					</RctCollapsibleCard>
				</div>
			</div>
		)
	}
}
