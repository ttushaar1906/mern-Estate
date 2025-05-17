import axios from "axios"
import { ContactUsInt } from "../../interfaces/ContactUsInt"
import { viewInEquirySend } from "../../apis/contactUsAPI"

export const viewInequeryFn = async()=>{
    const response = await axios.get<ContactUsInt>(viewInEquirySend)    
    return response
}