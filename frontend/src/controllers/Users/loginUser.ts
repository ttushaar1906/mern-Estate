import axios from "axios"
import {  ProfileIn, UserLoginInt } from "../../interfaces/ProfileInt"
import { loginUser, userDetails } from "../../apis/userAPI"

export const loginUserFn = async(userData:UserLoginInt)=>{
    const response = await axios.post<UserLoginInt>(loginUser,userData, { withCredentials: true })
    return response
}

export const userDetailsFn = async()=>{
    const response = await axios.get<ProfileIn>(userDetails)
    return response
}