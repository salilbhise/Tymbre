/**
 * Agency Dashboard
 */

import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

//Widgets
import {
   AgencyWelcomeBlock,
   ToDoListWidget,
   NewCustomersWidget,
   PersonalSchedule,
   TotalEarnsWithAreaChartWidget,
   NewEmailsWidget,
   EmployeePayrollWidget,
   DailySales,
   TrafficChannel,
   CampaignPerformance
} from "Components/Widgets";

// widgets data
import {
   totalEarns,
   dailySales,
   trafficChannel
} from './data';


export default class AgencyDashboard extends Component {
   render() {
      return (
         <div className="agency-dashboard-wrapper">
            <Helmet>
               <title>Agency Dashboard</title>
               <meta name="description" content="Reactify Agency Dashboard" />
            </Helmet>
            <AgencyWelcomeBlock />
            <RctCollapsibleCard
               heading={<IntlMessages id="widgets.totalEarns" />}
               collapsible
               reloadable
               closeable
            >
               <TotalEarnsWithAreaChartWidget chartData={totalEarns} />
            </RctCollapsibleCard>
            <div className="row">
               <RctCollapsibleCard
                  customClasses="overflow-hidden"
                  colClasses="col-sm-6 col-md-6 col-lg-4"
                  heading={<IntlMessages id="widgets.dailySales" />}
                  badge={{
                     name: <IntlMessages id="widgets.today" />,
                     class: 'danger'
                  }}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <DailySales
                     label={dailySales.label}
                     chartdata={dailySales.chartdata}
                     labels={dailySales.labels}
                  />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  heading={<IntlMessages id="widgets.trafficChannel" />}
                  customClasses="overflow-hidden"
                  colClasses="col-sm-6 col-md-6 col-lg-4"
                  badge={{
                     name: <IntlMessages id="widgets.today" />,
                     class: 'danger'
                  }}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <TrafficChannel
                     label={trafficChannel.label}
                     chartdata={trafficChannel.chartdata}
                     labels={trafficChannel.labels}
                  />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  heading={<IntlMessages id="widgets.campaignPerformance" />}
                  colClasses="col-sm-12 col-md-6 col-lg-4"
                  collapsible
                  reloadable
                  closeable
               >
                  <CampaignPerformance />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  customClasses="to-do-list"
                  colClasses="col-sm-6 col-md-6 col-lg-4"
                  heading={<IntlMessages id="widgets.toDoList" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <ToDoListWidget />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  colClasses="col-sm-6 col-md-6 col-lg-4"
                  heading={<IntlMessages id="widgets.newCustomers" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <NewCustomersWidget />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-6 col-lg-4"
                  fullBlock
                  customClasses="overflow-hidden bg-light-yellow"
               >
                  <PersonalSchedule />
               </RctCollapsibleCard>
            </div>
            <div className="row">
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-7 col-xl-7 b-100 w-xs-full"
                  heading={<IntlMessages id="widgets.newEmails" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <NewEmailsWidget />
               </RctCollapsibleCard>
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-5 col-xl-5 b-100 w-xs-full"
                  heading={<IntlMessages id="widgets.employeePayroll" />}
                  collapsible
                  reloadable
                  closeable
                  fullBlock
               >
                  <EmployeePayrollWidget />
               </RctCollapsibleCard>
            </div>
         </div>
      )
   }
}
