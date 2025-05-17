export interface NotificationInt {
  open: boolean;
  message: string;
  actionLabel?: string;
  severity?:  "error" | "info" | "success" | "warning";
  onClose: () => void;
  autoHideDuration?: number;
}

export type SnackBarState = {
        open: boolean;
        severity: "info" | "success" | "error" | "warning";
        message: string;
        autoHideDuration: number;
    };