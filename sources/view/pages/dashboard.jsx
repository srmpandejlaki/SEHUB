import React from "react";
import DashboardTable from "../../components/dashboard-page/table-dashboard";
import NotificationSide from "../../components/dashboard-page/notification-side";
import ShortPanel from "../../components/dashboard-page/short-panel";

function DashboardPage() {
  return (
    <div className="content dashboard">
      <div className="opening">
        <h3>Selamat Datang Admin!</h3>
        <p>20 September 2025</p>
      </div>
      <div className="container-dashboard">
        <ShortPanel />
        <NotificationSide />
        <DashboardTable />
      </div>
    </div>
  );
}

export default DashboardPage;