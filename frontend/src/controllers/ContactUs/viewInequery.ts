import axios from "axios"
import { viewInEquirySend } from "../../apis/contactUsAPI"

export const viewInequeryFn = async()=>{
    const response = await axios.get(viewInEquirySend, {withCredentials: true,})    
    return response.data.data
}