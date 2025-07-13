import { CircularProgress } from "@mui/material"
import ForgetPasswordImg from "../images/forgetPassword.jpg"

export default function ForgetPassword() {
    return (
        <section className="container customeContainer border pt-10 block sm:flex justify-center">
            <div className="w-full sm:w-1/2   ">
                <img src={ForgetPasswordImg} alt="forgetPassword" className="block mx-auto" />
            </div>

            <div className="w-full sm:w-1/2 h-auto">
                <h1 className="lgHeading p-4">Forgot Password</h1>


                <div className="my-4 flex justify-center">
                    {/* { ? ( */}
                    <div className="buttonStyle w-[75%] text-center">
                        <CircularProgress size={16} />
                    </div>
                    {/* ) : ( */}
                    <button
                        // onClick={}
                        className="buttonStyle w-[75%] block mx-auto "
                    >
                        Conform
                    </button>
                    {/* )} */}
                </div>
            </div>

        </section>
    )
}
