import { useState } from "react";
import { SnackBarState } from "../interfaces/NotificationInt";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import NewPasswordImg from "../images/createPassword.png"
import { FaExclamation } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { createPassword } from "../apis/userAPI"
import axios from "axios";

interface CreateNewPasswordProps {
  userEmail: string;
}

export default function CreateNewPassword({ userEmail }: CreateNewPasswordProps) {

    const [snackBar, setSnackBar] = useState<SnackBarState>({
        open: false,
        severity: "info",
        message: "",
        autoHideDuration: 3000,
    });
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (!password.trim()) {
            setSnackBar({
                open: true,
                message: "Please enter a password.",
                severity: "warning",
                autoHideDuration: 4000,
            });
            return;
        }

        if (password !== confirmPassword) {
            setSnackBar({
                open: true,
                message: "Passwords do not match.",
                severity: "error",
                autoHideDuration: 4000,
            });
            return;
        }

        try {
            setLoading(true);
            // Simulate API call
            // await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await axios.post(createPassword,{userEmail,password:confirmPassword })

            setSnackBar({
                open: true,
                message: `${response.data.message}`,
                severity: "success",
                autoHideDuration: 3000,
            });
            setTimeout(() => {
                navigate("/signIn")
            }, 1000)

            // setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setSnackBar({
                open: true,
                message: "Failed to update password. Please try again.",
                severity: "error",
                autoHideDuration: 4000,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left side - Illustration */}
                    <div className="lg:w-1/2 bg-gray-800 p-8 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="w-48 h-48 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                                <img src={NewPasswordImg} alt="" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Forgot Your Password?</h2>
                            <p className="text-blue-100 text-lg">
                                Choose a strong password to keep your account secure and protected.
                            </p>
                        </div>
                    </div>
                    {/* Right side - Form */}
                    <div className="lg:w-1/2 p-8 lg:p-12">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h1>
                                <p className="text-gray-600">Create a strong password for your account security.</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your new password"
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            title="passwordBtn"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {showPassword ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.68 6.68m3.198 3.198a3 3 0 013.198-3.198m0 0L16.32 3.32m-3.198 3.198L9.878 9.878m0 0L3 3m6.878 6.878L21 21" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your new password"
                                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors ${confirmPassword && password !== confirmPassword
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                : confirmPassword && password === confirmPassword
                                                    ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                                                    : 'border-gray-300 focus:border-indigo-500'
                                                }`}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            title="passwordBtn"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {showConfirmPassword ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.68 6.68m3.198 3.198a3 3 0 013.198-3.198m0 0L16.32 3.32m-3.198 3.198L9.878 9.878m0 0L3 3m6.878 6.878L21 21" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                )}
                                            </svg>
                                        </button>
                                        {confirmPassword && password !== confirmPassword && (
                                            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                                                <FaExclamation color="red" />
                                            </div>
                                        )}
                                        {confirmPassword && password === confirmPassword && (
                                            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                                                <FaExclamation color="green" />
                                            </div>
                                        )}
                                    </div>
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                                    )}
                                    {confirmPassword && password === confirmPassword && (
                                        <p className="mt-2 text-sm text-green-600">Passwords match</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading || password !== confirmPassword}
                                    className="buttonStyle w-[90%] block mx-auto"
                                >
                                    {isLoading ? (
                                        <div className="flex justify-center gap-4 items-center text-white">
                                            <CircularProgress size={14} color="inherit" />
                                            Updating Password...
                                        </div>
                                    ) : (
                                        'Update Password'
                                    )}
                                </button>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => navigate("/signIn")}
                                    className="text-slate-700 hover:text-slate-800 font-medium transition-colors cursor-pointer"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {snackBar.open && (
                <Notification
                    open={snackBar.open}
                    severity={snackBar.severity}
                    message={snackBar.message}
                    onClose={() => setSnackBar({ ...snackBar, open: false })}
                    autoHideDuration={snackBar.autoHideDuration}
                />
            )}
        </div>
    );
}