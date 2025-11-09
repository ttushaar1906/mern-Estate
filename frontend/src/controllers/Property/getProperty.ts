import { getCheapProperties, getProperties, getProperty, ownerProperty } from "../../apis/properiesAPI";
import { PropertyInt } from "../../interfaces/PropertyInt";
import axios from "axios";

export const getPropertiesFn = async (page = 1, search = "") => {
  const response = await axios.get(getProperties(page, search));  
  return response.data; // Keep full object with { data, total, page, pages }
};

export const getCheapPropertiesFn = async() =>{
  const response = await axios.get(getCheapProperties)  
  return response.data.data
}

// This is for Single View
export const getPropertyFn = async (id: string) => {
  const response = await axios.get<{data:PropertyInt}>(getProperty(id));  
  return response.data;
}

export const ownerPropertyFn = async () => {
  const response = await axios.get(ownerProperty, { withCredentials: true });  
  console.log(response.data.propertyResponse);
  
  return response.data.propertyResponse ?? [];
};
