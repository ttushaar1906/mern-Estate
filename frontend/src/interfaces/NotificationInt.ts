export interface NotificationInt {
  open: boolean;
  message: string;
  severity?: "" | "error" | "info" | "success" | "warning";
  handleClose: () => void;
  autoHideDuration?: number;
}
