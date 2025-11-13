import React from "react";
import DashboardTable from "../../components/dashboard-page/table-dashboard";
import NotificationSide from "../../components/dashboard-page/notification-side";
import ShortPanel from "../../components/dashboard-page/short-panel";

function DashboardPage() {
  return (
    <div className="content dashboard">
      <ShortPanel />
      <NotificationSide />
      <DashboardTable />
    </div>
  );
}

export default DashboardPage;