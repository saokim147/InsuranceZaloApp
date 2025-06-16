"use client";
import { toast as sonnerToast } from "sonner";

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  variant: "success" | "error";
}

export default function toast(toast: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      variant={toast.variant}
    />
  ));
}

function Toast(props: ToastProps) {
  const { title, description, variant } = props;

  const bgColor =
    variant === "success"
      ? "bg-green-50 border-green-500"
      : "bg-red-50 border-red-500";
  const iconColor = variant === "success" ? "text-green-500" : "text-red-500";
  const borderColor =
    variant === "success" ? "border-green-500" : "border-red-500";

  return (
    <div
      className={`flex rounded-lg shadow-lg ring-1 ring-black/5 items-center p-3  ${bgColor} ${borderColor}`}
    >
      <div className={`mr-3 ${iconColor}`}>
        {variant === "success" ? (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.15" />
            <path
              d="M7 13l3 3 7-7"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#ef4444" opacity="0.15" />
            <path
              d="M15 9l-6 6M9 9l6 6"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        {description && (
          <p className="text-sm text-gray-700 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
