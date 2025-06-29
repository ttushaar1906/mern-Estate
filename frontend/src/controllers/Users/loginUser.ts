import axios from "axios";
import { UserLoginInt } from "../../interfaces/ProfileInt";
import { loginUser, userDetails } from "../../apis/userAPI";

export const loginUserFn = async (userData: UserLoginInt) => {
  const response = await axios.post<UserLoginInt>(loginUser, userData, {
    withCredentials: true,
  });
  return response;
};

export const userDetailsFn = async () => {
  const response = await axios.get(userDetails, {
    withCredentials: true,
  });
  console.log(response.data);
  
  return response.data;
};


