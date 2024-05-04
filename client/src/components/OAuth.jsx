import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'

export default function OAuth() {
    const handleGoogleClick = async ()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)

            console.log(result)
        } catch (error) {
            console.log("Could Not Sign in with Google", error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className="p-2 border uppercase rounded-md font-bold bg-red700 text-white hover:bg-red hover:text-white">Continue with google</button>
  )
}
