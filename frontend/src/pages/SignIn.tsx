import { Link, useNavigate } from "react-router-dom";
import SignInImg from "../images/SignIn.jpeg"
import { AiFillGoogleCircle } from "react-icons/ai";
import { useState } from "react";
import { loginUserFn, userDetailsFn } from "../controllers/Users/loginUser";
import { CircularProgress } from "@mui/material";
import Notification from "../components/Notification";
import { SnackBarState } from "../interfaces/NotificationInt";
import { signInSuccess } from "../redux/User/userSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function SignIn() {

    const dispatch = useDispatch()
    const inputFields: string[] = ["Email", "Password"];
    const [formData, setFormData] = useState({
        userEmail: "",
        password: ""
    })
    const [snackBar, setSnackBar] = useState<SnackBarState>({
        open: false,
        severity: "info",
        message: "",
        autoHideDuration: 3000
    });
    const [isLoading, setLoading] = useState<Boolean>(false)
    const navigate = useNavigate()

    const userDetails = async () => {
        const response = await userDetailsFn()
        const userData = response.data?.data[0];  
        return userData
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        try {
            const response = await loginUserFn(formData)
            setFormData({
                userEmail: "",
                password: "",
            })
            setSnackBar({
                open: true,
                message: "Logged In Successfully !!",
                severity: "success",
                autoHideDuration: 3000
            })
            const user = await userDetails()            
            dispatch(signInSuccess(user))
            Cookies.set("accessToken", response.data.accessToken, { secure: true, sameSite: "strict" });
            setTimeout(() => {
                navigate("/")
            }, 1000)

        } catch (error: any) {
            console.log(error);

            setSnackBar({
                open: true,
                message: `Failed to Log in ${error.response?.data?.message || error.message}`,
                severity: "error",
                autoHideDuration: 3000
            })
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    return (
        <div className="container customeContainer pt-10 block sm:flex justify-center">
            <div className="w-full sm:w-1/2   ">
                <img src={SignInImg} alt="SignIn" />
            </div>
            <div className="w-full sm:w-1/2 h-auto ">
                <h1 className="lgHeading p-4">Sign In</h1>

                <form className=" ">
                    {inputFields.map((field, index) => (
                        <div
                            key={index}
                            className="m-1 flex flex-col justify-evenly items-center p-2 w-[90%]"
                        >
                            <div className="relative w-full">
                                <input
                                    id={field}
                                    type={field.toLowerCase() === "password" ? "password" : "email"}
                                    name={field.toLowerCase()}
                                    value={formData[field.toLowerCase() as "userEmail" | "password"]}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            [field.toLowerCase() === "email" ? "userEmail" : "password"]: e.target.value,
                                        })
                                    }
                                    className="peer inputFields "
                                    placeholder={field === "Email" ? "Enter Email ID" : "Enter Password"}
                                    autoComplete="off"
                                />
                                <label
                                    htmlFor={field}
                                    className={`absolute left-2 transition-all bg-white px-2
          ${formData[field.toLowerCase() === "email" ? "userEmail" : "password"]
                                            ? "top-[-0.5rem] text-sm text-cyan-600"
                                            : "top-2 text-base text-slate-400 peer-focus:top-[-0.5rem] peer-focus:text-sm peer-focus:text-slate-700"
                                        }`}
                                >
                                    {field}
                                </label>
                            </div>
                        </div>
                    ))}

                    <div className='my-4 flex justify-center'>

                        {isLoading ? (
                            <div className='buttonStyle w-[75%]'>
                                <CircularProgress color='white' size={18} />
                            </div>
                        ) : (
                            <button onClick={handleLogin} className="buttonStyle w-[75%] block mx-auto">
                                Sign In
                            </button>)}
                    </div>

                    <p className="p-2 text-slate-600 text-center">Forgot Password ?</p>

                    <div className=" flex flex-col items-center ">
                        <p className="my-2">
                            OR
                        </p>
                        <div className="flex border rounded-xl w-[75%] mt-2 darkColor items-center p-4 gap-2 justify-center hover:cursor-pointer hover:shadow-md">
                            <AiFillGoogleCircle size={20} />
                            <p>
                                Continue with Google
                            </p>
                        </div>

                        <div className="p-3 mt-2">
                            Don't have an Account ?
                            <Link to="/signUp">
                                <span className="px-1 darkColor">
                                    Create Now..
                                </span>
                            </Link>
                        </div>
                    </div>
                </form>
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
