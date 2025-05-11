import { Link } from 'react-router-dom'
import SignInImg from '../images/SignIn.jpeg'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { createUserFn } from '../controllers/Users/createUser'
import { useState } from 'react'
import { ProfileIn } from '../interfaces/ProfileInt'
import Notification from '../components/Notification'
import CircularProgress from '@mui/material/CircularProgress';

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
        } catch (error: any) {
            setSnackBar({
                open: true,
                message: `${error.response.data.message}`,
                severity: "erro",
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
                <h1 className="lgHeading p-4">Sign In</h1>

                <form onSubmit={handleSubmit}>
                    {inputFields.map((field, index) => (
                        <div key={index} className="m-1 flex flex-col justify-evenly items-center p-2">
                            <label htmlFor={field.name} className="capitalize mb-2">
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={(formData as any)[field.name] || ""}
                                onChange={handleChange}
                                className="inputFields w-[80%]"
                                autoComplete="off"
                                placeholder={`Enter ${field.label}`}
                            />
                        </div>
                    ))}

                    <div className='my-4 flex justify-center'>
                        {isLoading ? (
                            <div className='buttonStyle '>
                                <CircularProgress color='white' size={18} />
                            </div>

                        ) : (
                            <button onClick={handleSubmit} className="buttonStyle ">
                                Sign Up
                            </button>
                        )}
                    </div>


                    <div className=" flex flex-col items-center">
                        <span>
                            OR
                        </span>

                        <div className="flex border rounded-xl w-[80%] mt-2 darkColor items-center p-4 gap-2 justify-center hover:cursor-pointer hover:shadow-md">
                            <AiFillGoogleCircle size={20} />
                            <p>
                                Continue with Google
                            </p>
                        </div>

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
