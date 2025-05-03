import { apiErrorHandler } from "./error.js";

export const nameValidtion = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

    if (!nameRegex.test(name) || name === "") return apiErrorHandler(400, "Invalid Name")
}

export const mobileNoValidation = (mobileNo) => {
    const numberRegex = /^[^0-5]\d{9}$/
    const vendorMobNoString = String(mobileNo);
    if (!vendorMobNoString || vendorMobNoString.length !== 10 || !numberRegex.test(vendorMobNoString)) return apiErrorHandler(400, "Invalid Mobile No")
    // return { isValid: true }
}

// For email
