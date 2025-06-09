import { Link, useNavigate } from 'react-router-dom'
import SignInImg from '../images/SignIn.jpeg'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { createUserFn } from '../controllers/Users/createUser'
import { useState } from 'react'
import { ProfileIn } from '../interfaces/ProfileInt'
import Notification from '../components/Notification'
import CircularProgress from '@mui/material/CircularProgress';
import GoogleLogin from '../components/GoogleLogin'

export default function SignUp() {
    const [formData, setFormData] = useState<ProfileIn>({
        userName: "",
        userEmail: "",
        mobileNo: null,
        password: "",
        joinInDate: "",
        avatar: ""
    })
    const [isLoading, setLoading] = useState<boolean>(false);
    const [snackBar, setSnackBar] = useState({
        open: false,
        severity: "info",
        message: "",
        autoHideDuration: 3000
    });
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        try {
            await createUserFn(formData)
            setFormData({
                userName: "",
                userEmail: "",
                mobileNo: null,
                password: "",
                avatar: "",
                joinInDate: ""
            })
            setSnackBar({
                open: true,
                message: "User Account Created Successfully",
                severity: "success",
                autoHideDuration: 3000
            })
            setTimeout(() => {
                navigate("/signIn")
            }, 1000)
        } catch (error: any) {
            setSnackBar({
                open: true,
                message: `${error.response.data.message}`,
                severity: "error",
                autoHideDuration: 3000
            })
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }


    const inputFields = [
        { label: "Username", name: "userName", type: "text" },
        { label: "Email", name: "userEmail", type: "email" },
        { label: "Mobile No", name: "mobileNo", type: "number" },
        { label: "Password", name: "password", type: "password" }
    ];

    return (
        <div className="container customeContainer pt-10 flex justify-center flex-col-reverse sm:flex-row">

            <div className="w-full sm:w-1/2 h-auto">
                <h1 className="lgHeading p-4">Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    {inputFields.map((field, index) => (
                        <div key={index} className="m-1 flex flex-col justify-evenly items-center p-2 w-[90%] ">
                            <div className="relative w-full">
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    value={(formData as any)[field.name] || ""}
                                    onChange={handleChange}
                                    className="peer inputFields"
                                    autoComplete="off"
                                    placeholder={`Enter ${field.label}`} 
                                />
                                <label
                                    htmlFor={field.name}
                                    className={`absolute left-2 transition-all bg-white px-2  
        ${((formData as any)[field.name])
                                            ? 'top-[-0.5rem] text-sm text-cyan-600' 
                                            : 'top-2 text-base text-slate-400 peer-focus:top-[-0.5rem] peer-focus:text-sm peer-focus:text-slate-700'}`}
                                >
                                    {field.label}
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
                            <button onClick={handleSubmit} className="buttonStyle w-[75%] ">
                                Sign Up
                            </button>
                        )}
                    </div>


                    <div className=" flex flex-col items-center">
                        <span>
                            OR
                        </span>

                      <GoogleLogin />

                        <div className="p-3">
                            Already have an account ?
                            <Link to="/signIn">
                                <span className="px-1 darkColor">
                                    Sign In
                                </span>
                            </Link>
                        </div>
                    </div>

                </form>
            </div>

            <div className="w-full sm:w-1/2">
                <img src={SignInImg} alt="SignIn" />
            </div>

            {/* Show Notification */}
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
