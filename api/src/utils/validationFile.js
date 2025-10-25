import { apiErrorHandler } from "./error.js";

export const nameValidation = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    if (!nameRegex.test(name) || name === "") throw new apiErrorHandler(400, "Invalid Name")
}

export const mobileNoValidation = (mobileNo) => {
    const numberRegex = /^[^0-5]\d{9}$/;
    const mobileStr = String(mobileNo);

    if (!mobileStr || mobileStr.length !== 10 || !numberRegex.test(mobileStr)) {
        throw new apiErrorHandler(400, "Invalid Mobile No");
    }
};

// For email
export const emailValidation = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        throw new apiErrorHandler(400, "Invalid Email Format");
    }
};
