import axios from "axios";
import { createProperty } from "../../apis/properiesAPI";
import { PropertyInt } from "../../interfaces/PropertyInt";

export const createPropertyFn = async (propertyData: PropertyInt) => {
  const response = await axios.post<PropertyInt>(createProperty,propertyData,{ withCredentials: true });
  return response;
};
