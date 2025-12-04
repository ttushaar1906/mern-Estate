import { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';
import { SnackBarState } from '../interfaces/NotificationInt';
import { Tooltip } from '@mui/material';

interface SoldToggleSwitchProps {
  apiEndpoint: string;
  defaultChecked?: boolean;
}

export default function SoldToggleSwitch({ apiEndpoint, defaultChecked = false }: SoldToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    severity: "success",
    message: "",
    autoHideDuration: 3000
  });

  const handleToggle = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.patch(apiEndpoint, null, { withCredentials: true });
      const newValue = response.data?.data?.isSold ?? !isChecked;
      setIsChecked(newValue);
      setSnackBar({
        open: true,
        message: "Status Changed !!",
        severity: "success",
        autoHideDuration: 3000
      })
      // console.log('✅ Status changed:', newValue);
    } catch (error: any) {
      // console.error('❌ Failed to change status:', error);
      setSnackBar({
        open: true,
        message: error.response.data || "Failed to change status. Please try again.",
        severity: "success",
        autoHideDuration: 3000
      })
      // alert('Failed to change status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip title={isChecked ? "Mark as Available" : "Mark as Sold"}>
      <button
        type="button"
        role="switch"
        aria-checked={!!isChecked} // ✅ force primitive boolean
        onClick={handleToggle}
        disabled={isLoading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out 
    focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2
    ${isChecked ? 'bg-slate-700' : 'bg-gray-300'}
    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out
      ${isChecked ? 'translate-x-6' : 'translate-x-1'}
      ${isLoading ? 'animate-pulse' : ''}
    `}
        />

        {snackBar.open && (
          <Notification
            open={snackBar.open}
            severity={snackBar.severity}
            message={snackBar.message}
            onClose={() => setSnackBar({ ...snackBar, open: false })}
            autoHideDuration={snackBar.autoHideDuration}
          />
        )}
      </button>

    </Tooltip>
  );
}
