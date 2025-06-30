import React from "react";

interface NotificationProps {
  message: string;
  color: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  color,
  onClose,
}) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-medium transition-all ${
        color === "green"
          ? "bg-green-600"
          : color === "red"
          ? "bg-red-600"
          : "bg-gray-800"
      }`}
      role="alert"
    >
      <div className="flex items-center">
        <span>{message}</span>
        <button
          className="ml-4 text-white hover:text-gray-200"
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
