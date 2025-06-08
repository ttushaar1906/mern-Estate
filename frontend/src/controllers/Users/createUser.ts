import axios from "axios"
import { createUser, updateUser } from "../../apis/userAPI"
import { ProfileIn } from "../../interfaces/ProfileInt"

export const createUserFn = async(userData:ProfileIn) =>{
    const userResponse = await axios.post<ProfileIn>(createUser,userData)
    return userResponse
}

// export const updateUserFn = async(userData:ProfileIn)=>{
//     const updateUserResponse = await axios.post(updateUser,userData)
//     return updateUserResponse
// }

export const updateUserFn = async (userData: ProfileIn) => {
  const formData = new FormData();

  if (userData.avatar && userData.avatar.startsWith("data:")) {
    // If avatar is a base64 string, convert it back to a Blob/File before appending
    const blob = await (await fetch(userData.avatar)).blob();
    formData.append("avatar", new File([blob], "avatar.png", { type: blob.type }));
  }

  formData.append("userName", userData.userName);
//   formData.append("userEmail", userData.userEmail);
  formData.append("mobileNo", userData.mobileNo.toString());

  const response = await axios.post(updateUser, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response.data;
};
