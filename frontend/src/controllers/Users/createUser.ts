import axios from "axios"
import { createUser } from "../../apis/userAPI"
import { ProfileIn } from "../../interfaces/ProfileInt"

export const createUserFn = async(userData:ProfileIn) =>{
    const userResponse = await axios.post<ProfileIn>(createUser,userData)
    return userResponse
}