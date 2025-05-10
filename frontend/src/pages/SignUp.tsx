import { Link } from 'react-router-dom'
import SignInImg from '../images/SignIn.jpeg'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { createUserFn } from '../controllers/Users/createUser'
import { useState } from 'react'
import { ProfileIn } from '../interfaces/ProfileInt'
// import { showNotification } from '../components/Notification'

export default function SignUp() {
    const [formData, setFormData] = useState<ProfileIn>({
        name: "",
        email: "",
        mobileNo: null,
        password: "",
        joinInDate: "",
        avatar: ""
    })

    const [err,setErr] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await createUserFn(formData)
            console.log(response);

            // showNotification({
            //     type:'success',
            //     message:"User Created Successfully",
            //     duration : 5
            // })
            setFormData({
                name:"",
                email:"",
                mobileNo:null,
                password:"",
                avatar:"",
                joinInDate:""
            })
        } catch (error) {
          
            const message =
                error?.response?.data?.message || 
                error?.message || 
                'Something went wrong';
        
            // showNotification({
            //     type: 'error',
            //     message: message,
            //     duration: 5
            // });

            setErr(error.response.data.message)
            
        }   
    }


    const inputFields = [
        { label: "Username", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
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
 
                      <p>Error : {err}</p>  

                    <button onClick={handleSubmit} className="buttonStyle block mx-auto">
                        Sign Up
                    </button>

                    <div className=" flex flex-col items-center">
                        <p className="pt-2">
                            OR
                        </p>

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
        </div>
    )
}
