import { Link, useNavigate } from "react-router-dom";
import SignInImg from "../images/SignIn.jpeg"
import { AiFillGoogleCircle } from "react-icons/ai";
import { useState } from "react";
import { loginUserFn } from "../controllers/Users/loginUser";
import { CircularProgress } from "@mui/material";
import Notification from "../components/Notification";

export default function SignIn() {
    const inputFields: string[] = ["email", "password"];
    const [formData, setFormData] = useState({
        userEmail: "",
        password: ""
    })
    const [snackBar, setSnackBar] = useState({
        open: false,
        severity: "info",
        message: "",
        autoHideDuration: 3000
    });
    const [isLoading, setLoading] = useState<Boolean>(false)
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        try {
            await loginUserFn(formData)
            setFormData({
                userEmail: "",
                password: "",
            })
            setSnackBar({
                open:true,
                message:"Logged In Successfully !!",
                severity:"success",
                autoHideDuration:3000
            })
            console.log(`Logged successfully`);
            setTimeout(()=>{
                navigate("/")
            },1000)

        } catch (error: any) {
            console.log(error);

            setSnackBar({
                open: true,
                message: `Failed to Log in ${error.response.data.message}`,
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
        <div className="container customeContainer pt-10 block sm:flex justify-center ">
            <div className="w-full sm:w-1/2   ">
                <img src={SignInImg} alt="SignIn" />
            </div>
            <div className="w-full sm:w-1/2 h-auto  ">
                <h1 className="lgHeading p-4">Sign In</h1>

                <form className=" ">
                    {inputFields.map((field, index) => (
                        <div key={index} className="m-1 flex flex-col justify-evenly items-center p-2">
                            <label htmlFor={field} className=" capitalize mb-2">
                                {field}
                            </label>
                            <input
                                id={field}
                                type={field === "password" ? "password" : "email"}
                                name={field}
                                value={field === "email" ? formData.userEmail : formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [field === "email" ? "userEmail" : "password"]: e.target.value,
                                    })}
                                className="inputFields w-[80%]"
                                placeholder={field === "email" ? "Enter Email ID" : "Enter Password"}
                                autoComplete="off"
                            />
                        </div>
                    ))}
                    <div className='my-4 flex justify-center'>

                        {isLoading ? (
                            <div className='buttonStyle '>
                                <CircularProgress color='white' size={18} />
                            </div>
                        ) : (
                            <button onClick={handleLogin} className="buttonStyle block mx-auto">
                                Sign In
                            </button>)}
                    </div>

                    <p className="p-2 text-slate-600 text-center">Forgot Password ?</p>

                    <div className=" flex flex-col items-center">
                        <p className="">
                            OR
                        </p>
                        <div className="flex border rounded-xl w-[80%] mt-2 darkColor items-center p-4 gap-2 justify-center hover:cursor-pointer hover:shadow-md">
                            <AiFillGoogleCircle size={20} />
                            <p>
                                Continue with Google
                            </p>
                        </div>

                        <div className="p-3">
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
