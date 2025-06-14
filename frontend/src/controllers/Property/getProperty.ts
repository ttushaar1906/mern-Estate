import { getProperties, getProperty, ownerProperty } from "../../apis/properiesAPI";
import { PropertyInt } from "../../interfaces/PropertyInt";
import axios from "axios";


export const getPropertiesFn = async()=>{
  const response = await axios.get(getProperties)
  console.log(response);
  return response.data.data
}

// This is for Single View
export const getPropertyFn = async (id: string) => {
  const response = await axios.get<{data:PropertyInt}>(getProperty(id));  
  return response.data;
}

export const ownerPropertyFn = async ()=>{
  const response = await axios.get(ownerProperty,{withCredentials:true})
  return response.data.propertyResponse
}