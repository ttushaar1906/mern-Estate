import { getProperties, getProperty } from "../../apis/properiesAPI";
import { PropertyInt } from "../../interfaces/PropertyInt";
import axios from "axios";

export const getPropertiesFn = async () => {
  const response = await axios.get<PropertyInt[]>(getProperties);
  return response.data;
};

export const getPropertyFn = async (id: string) => {
  const response = await axios.get<PropertyInt>(getProperty(id));
  return response;
}
