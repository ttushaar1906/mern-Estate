// import  { useState } from 'react';

// interface SoldToggleSwitchProps {
//   defaultChecked?: boolean;
//   disabled?: boolean;
//   apiEndpoint: string;
//   onSuccess?: (checked: boolean) => void;
//   onError?: (error: any) => void;
// }

// export default function SoldToggleSwitch({
//   label,
//   description,
//   defaultChecked = false,
//   disabled = false,
//   apiEndpoint,
//   onSuccess,
//   onError,
// }: SoldToggleSwitchProps) {
//   const [isChecked, setIsChecked] = useState(defaultChecked);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleToggle = async () => {
//     if (disabled || isLoading) return;

//     const newValue = !isChecked;
//     setIsLoading(true);

//     try {
//       // API call
//       const response = await fetch(apiEndpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           sold: newValue,
//           timestamp: new Date().toISOString(),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const data = await response.json();
      
//       // Update state only after successful API call
//       setIsChecked(newValue);
//       onSuccess?.(newValue);
//       console.log('API Success:', data);
//     } catch (error) {
//       console.error('API Error:', error);
//       onError?.(error);
//       // Optionally show error to user
//       alert('Failed to update status. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors">
//       <div className="flex-1 pr-4">
     
//       </div>
//       <button
//         type="button"
//         role="switch"
//         aria-checked={isChecked}
//         disabled={disabled || isLoading}
//         // onClick={handleToggle}
//         className={`
//           relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//           ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}
//           ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
//         `}
//       >
//         <span
//           className={`
//             inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out
//             ${isChecked ? 'translate-x-6' : 'translate-x-1'}
//             ${isLoading ? 'animate-pulse' : ''}
//           `}
//         />
//       </button>
//     </div>
//   );
// }

