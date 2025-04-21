export default function SignIn() {
    const inputFields: string[] = ["email", "password"];

    return (
        <div className="container customeContainer block sm:flex justify-center ">
            <div className="w-full sm:w-1/2 h-56  ">

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
                                className="inputFields w-1/2"
                                autoComplete="off"
                            />
                        </div>
                    ))}
                    <button type="submit" className="buttonStyle">
                        Sign In
                    </button>
                    <p className="p-2 text-slate-600 text-center">Forgot Password ?</p>

                    <div className="">
                        <p className="text-center">
                            OR
                        </p>
                        <p className="text-center buttonStyle2 darkColor w-1/2  ">
                            Continue with Google
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
