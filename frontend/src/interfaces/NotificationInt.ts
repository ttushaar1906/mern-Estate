export interface NotificationInt {
  open: boolean;
  message: string;
  actionLabel?: string;
  severity?:  "error" | "info" | "success" | "warning";
  onClose: () => void;
  autoHideDuration?: number;
}
