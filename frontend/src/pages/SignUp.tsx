import { Link } from 'react-router-dom'
import SignInImg from '../images/SignIn.jpeg'
import { AiFillGoogleCircle } from 'react-icons/ai'



export default function SignUp() {
    const inputFields: string[] = ["username", "email", "mobileNo", "password"]
    return (
        <div className="container customeContainer pt-10 flex justify-center flex-col-reverse sm:flex-row">

            <div className="w-full sm:w-1/2 h-auto">
                <h1 className="lgHeading p-4">Sign In</h1>

                <form className=" ">
                    {inputFields.map((field, index) => (
                        <div key={index} className="m-1 flex flex-col justify-evenly items-center p-2">
                            <label htmlFor={field} className=" capitalize mb-2">
                                {field}
                            </label>
                            <input
                                id={field}
                                type={field === "password" ? "password" : field === "email" ? "email" : field === "mobileNo" ? "number" : "text"}
                                name={field}
                                className="inputFields w-[80%]"
                                autoComplete="off"
                            />
                        </div>
                    ))}
                    <button type="submit" className="buttonStyle block mx-auto">
                        Sign Up
                    </button>

                    <div className=" flex flex-col items-center">
                        <p className="pt-2">
                            OR
                        </p>
                        {/* <div className="flex border w-[80%] mt-2 darkColor items-center p-4 gap-2 justify-center hover:cursor-pointer hover:shadow-md rounded-xl">
                            <AiFillGoogleCircle size={20} />
                            <p>
                                Continue with Google
                            </p>
                        </div> */}

                        <button
                            onClick={handleGoogleClick}
                            type="button"
                            className="p-2 border uppercase rounded-md font-bold bg-red700 text-white hover:bg-red hover:text-white"
                        >
                            Continue with google
                        </button>

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
        </div>
    )
}
