import React from "react";
import IconReminder from "../../assets/icon/carbon_reminder.svg?react";

function NotificationSide() {
  return(
    <div className="notification-side">
      <div className="notif-title">
        <IconReminder className="icon onPanel blackIcon" />
        <p>Pemberitahuan</p>
      </div>
      <div className="notif-content">
        <p className="redText">Peringatan!</p>
        <p>8 botol Seho Sirop 330ml akan segera kadaluarsa</p>
      </div>
      <div className="notif-content">
        <p className="redText">Peringatan!</p>
        <p>8 botol Seho Sirop 330ml akan segera kadaluarsa</p>
      </div>
      <div className="notif-content">
        <p className="redText">Peringatan!</p>
        <p>8 botol Seho Sirop 330ml akan segera kadaluarsa</p>
      </div>
      <div className="notif-content">
        <p>Belum ada notifikasi</p>
      </div>
    </div>
  );
}

export default NotificationSide;