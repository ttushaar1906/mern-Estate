const dbHost = "http://localhost:3000";

export const createUser = `${dbHost}/api/auth/signUp`
export const loginUser = `${dbHost}/api/auth/signIn`
export const googleLogin = `${dbHost}/api/auth/googleLogin`
export const logoutUser = `${dbHost}/api/auth/signout`
export const userDetails = `${dbHost}/api/user/user`
export const updateUser = `${dbHost}/api/user/updateUser`