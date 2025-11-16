import NotificationCard from "@/components/notifications/notification-card";
import { notifications } from "@/data/notifications";

export default function Notifications() {
  return (
    <div className="bg-white min-h-screen -mx-4 -my-4 md:-mx-6 md:-my-6 p-6">
      <div className="mx-auto max-w-2xl space-y-4 pt-8">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            icon={notification.icon}
            title={notification.title}
            subtitle={notification.subtitle}
            timestamp={notification.timestamp}
          />
        ))}
      </div>
    </div>
  );
}
