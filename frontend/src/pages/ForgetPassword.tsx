import { useState } from "react";
import Notification from "../components/Notification";
import { SnackBarState } from "../interfaces/NotificationInt";
import ForgotPassword from "../images/ForgotPassword.png"
import { CircularProgress } from "@mui/material";

export default function ForgetPassword() {

    const [snackBar, setSnackBar] = useState<SnackBarState>({
        open: false,
        severity: "info",
        message: "",
        autoHideDuration: 3000,
    });
    const [isLoading, setLoading] = useState<Boolean>(false);


    return (
        <div className="container customeContainer pt-10 flex justify-center flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2   ">
                <img src={ForgotPassword} alt="SignIn" />
            </div>

            <div className="w-full sm:w-1/2 h-auto">
                <h1 className="lgHeading p-4">Forgot Password</h1>
                <div className="border-2 border-red-200">

                    <div className="my-4 flex justify-center">
                        {isLoading ? (
                            <div className="buttonStyle w-[75%] text-white text-center">
                                <CircularProgress size={16} color="inherit" />
                            </div>
                        ) : (
                            <button
                                // onClick={handleLogin}
                                className="buttonStyle w-[75%] block mx-auto "
                            >
                                Send Request
                            </button>
                        )}
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
    )
}
