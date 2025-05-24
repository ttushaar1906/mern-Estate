import { getProperties, getProperty } from "../../apis/properiesAPI";
import { PropertyInt } from "../../interfaces/PropertyInt";
import axios from "axios";

export const getPropertiesFn = async () => {
  const response = await axios.get<{data:PropertyInt}>(getProperties);
  return response.data.data;
};


export const getPropertyFn = async (id: string) => {
  const response = await axios.get<{data:PropertyInt}>(getProperty(id));  
  return response.data;
}
