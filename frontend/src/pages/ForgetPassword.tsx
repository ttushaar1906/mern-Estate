import { useState } from "react";
import Notification from "../components/Notification";
import { SnackBarState } from "../interfaces/NotificationInt";
import { forgotPasswordRequest } from "../apis/userAPI";
import { otpVerify } from "../apis/userAPI"
import forgotPasswordRequestImg from "../images/ForgotPassword.png"
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateNewPassword from "../pages/CreateNewPassword";
import axios from "axios";

export default function EnhancedForgotPassword() {
    const [isLoading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: success
    const [snackBar, setSnackBar] = useState<SnackBarState>({
        open: false,
        severity: "info",
        message: "",
        autoHideDuration: 3000,
    });
    const [newPassword, setNewPassword] = useState<Boolean>(false)

    const navigate = useNavigate()
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSendRequest = async () => {
        if (!userEmail.trim()) {
            setSnackBar({
                open: true,
                message: "Please enter your email address.",
                severity: "warning",
                autoHideDuration: 4000,
            });
            return;
        }

        if (!validateEmail(userEmail)) {
            setSnackBar({
                open: true,
                message: "Please enter a valid email address.",
                severity: "warning",
                autoHideDuration: 4000,
            });
            return;
        }

        try {
            setLoading(true);
            // Simulate API call
            const response = await axios.post(forgotPasswordRequest, { userEmail });
            setSnackBar({
                open: true,
                message: `${response.data.message}`,
                severity: "success",
                autoHideDuration: 3000,
            });

            setStep(2);
        } catch (error) {
            console.error(error);
            setSnackBar({
                open: true,
                message: "Failed to send reset link. Please try again.",
                severity: "error",
                autoHideDuration: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otpCode.trim() || otpCode.length !== 6) {
            setSnackBar({
                open: true,
                message: "Please enter a valid 6-digit OTP.",
                severity: "warning",
                autoHideDuration: 4000,
            });
            return;
        }

        try {
            setIsVerifyingOtp(true);
            const response = await axios.post(otpVerify, { userEmail,otp:otpCode })
            setSnackBar({
                open: true,
                message: `${response.data.message}`,
                severity: "success",
                autoHideDuration: 3000,
            });

            setStep(3);
        } catch (error:any) {
            console.error(error);
            setSnackBar({
                open: true,
                message: `${error.response.data.message}`,
                severity: "error",
                autoHideDuration: 4000,
            });
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSnackBar({
                open: true,
                message: "New OTP sent to your email.",
                severity: "success",
                autoHideDuration: 3000,
            });
        } catch (error) {
            setSnackBar({
                open: true,
                message: "Failed to resend OTP. Please try again.",
                severity: "error",
                autoHideDuration: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setUserEmail("");
        setOtpCode("");
        setStep(1);
    };

    const handleCreateNewPassword = () => {
        setNewPassword(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            {!newPassword && (

                <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left side - Illustration */}
                        <div className="lg:w-1/2 bg-gray-800 p-8 flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="w-48 h-48 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                                    <img src={forgotPasswordRequestImg} alt="" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Forgot Your Password?</h2>
                                <p className="text-blue-100 text-lg">
                                    No worries! We'll help you reset it securely and get you back to your account.
                                </p>
                            </div>
                        </div>

                        {/* Right side - Form */}
                        <div className="lg:w-1/2 p-8 lg:p-12">
                            {/* Progress indicator */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`flex items-center ${step >= 1 ? 'text-slate-700' : 'text-gray-400'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-gray-800 darkColor' : 'bg-gray-200'}`}>
                                            1
                                        </div>
                                        <span className="ml-2 font-medium">Email</span>
                                    </div>
                                    <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
                                    <div className={`flex items-center ${step >= 2 ? 'text-slate-700' : 'text-gray-400'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-gray-800 darkColor' : 'bg-gray-200'}`}>
                                            2
                                        </div>
                                        <span className="ml-2 font-medium">Verify</span>
                                    </div>
                                    <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-gray-800' : 'bg-gray-200'} rounded`}></div>
                                    <div className={`flex items-center ${step >= 3 ? 'text-slate-700' : 'text-gray-400'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-gray-800 darkColor' : 'bg-gray-200'}`}>
                                            ✓
                                        </div>
                                        <span className="ml-2 font-medium">Done</span>
                                    </div>
                                </div>
                            </div>

                            {step === 1 && (
                                <div className="space-y-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-slate-700 mb-2">Reset Password</h1>
                                        <p className="text-gray-600">Enter your email address and we'll send you a verification code.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Enter your registered email"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                name="userEmail"
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <button
                                            onClick={handleSendRequest}
                                            disabled={isLoading}
                                            className="buttonStyle w-[90%] block mx-auto"
                                        >
                                            {isLoading ? (
                                                <div className="flex justify-center gap-4 items-center text-white">
                                                    <CircularProgress size={14} color="inherit" />
                                                    Sending...
                                                </div>
                                            ) : (
                                                'Send Verification Code'
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
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h1>
                                        <p className="text-gray-600">
                                            We've sent a 6-digit code to <span className="font-medium text-gray-900">{userEmail}</span>
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-2">
                                                Verification Code
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter 6-digit code"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center text-2xl font-mono tracking-widest"
                                                name="otpCode"
                                                value={otpCode}
                                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                maxLength={6}
                                                disabled={isVerifyingOtp}
                                            />
                                        </div>

                                        <button
                                            onClick={handleVerifyOtp}
                                            disabled={isVerifyingOtp || otpCode.length !== 6}
                                            className="buttonStyle w-[90%] block mx-auto"
                                        >
                                            {isVerifyingOtp ? (
                                                <div className="flex justify-center gap-4 items-center text-white">
                                                    <CircularProgress size={14} color="inherit" />
                                                    Verifying...
                                                </div>
                                            ) : (
                                                'Verify Code'
                                            )}
                                        </button>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <p className="text-gray-600">Didn't receive the code?</p>
                                        <button
                                            onClick={handleResendOtp}
                                            disabled={isLoading}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors disabled:text-blue-300"
                                        >
                                            Resend Code
                                        </button>
                                        <div className="text-sm">
                                            <button
                                                onClick={resetForm}
                                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                            >
                                                Use different email
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Success!</h1>
                                        <p className="text-gray-600">
                                            Your identity has been verified. You can now create a new password.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleCreateNewPassword()}
                                        className="buttonStyle"
                                    >
                                        Create New Password
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            )}

            {newPassword && (
                <CreateNewPassword userEmail={userEmail} />
            )}

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
