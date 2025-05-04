// interfaces/NotificationInt.ts
export interface NotificationInt {
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
    description?: string;
    duration?: number;
    placement?: 'topRight' | 'topLeft' | 'bottomLeft' | 'bottomRight';
  }