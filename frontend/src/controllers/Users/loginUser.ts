import axios from "axios"
import {  UserLoginInt } from "../../interfaces/ProfileInt"
import { loginUser } from "../../apis/userAPI"

export const loginUserFn = async(userData:UserLoginInt)=>{
    const response = await axios.post<UserLoginInt>(loginUser,userData)
    return response
}