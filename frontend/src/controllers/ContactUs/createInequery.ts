import axios from "axios";
import { ContactUsInt } from "../../interfaces/ContactUsInt";
import { createQuery } from "../../apis/contactUsAPI";

export const createInequery = async (inequeryData: ContactUsInt) => {
  const response = await axios.post<ContactUsInt>(createQuery, inequeryData);
  return response;
};
