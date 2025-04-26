import { getProperties } from "../../apis/properiesAPI";
import { PropertyInt } from "../../interfaces/PropertyInt";
import axios from "axios";

export const getPropertiesFn = async () => {
  const response = await axios.get<PropertyInt[]>(getProperties);
  console.log(response.data);
  return response.data;
};
