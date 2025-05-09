import { Link } from "react-router-dom";
import SignInImg from "../images/SignIn.jpeg"
import { AiFillGoogleCircle } from "react-icons/ai";

export default function SignIn() {
    const inputFields: string[] = ["email", "password"];

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
                                className="inputFields w-[80%]"
                                autoComplete="off"
                            />
                        </div>
                    ))}
                    <button type="submit" className="buttonStyle block mx-auto">
                        Sign In
                    </button>
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
        </div>
    );
}
