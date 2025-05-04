import { apiErrorHandler } from "./error.js";

export const nameValidtion = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

    if (!nameRegex.test(name) || name === "") return apiErrorHandler(400, "Invalid Name")
}

// export const mobileNoValidation = (mobileNo) => {
//     const numberRegex = /^[^0-5]\d{9}$/
//     const vendorMobNoString = String(mobileNo);
//     if (!vendorMobNoString || vendorMobNoString.length !== 10 || !numberRegex.test(vendorMobNoString)) return apiErrorHandler(400, "Invalid Mobile No")
//     // return { isValid: true }
// }

export const mobileNoValidation = (mobileNo) => {
    const numberRegex = /^[^0-5]\d{9}$/;
    const mobileStr = String(mobileNo);

    if (!mobileStr || mobileStr.length !== 10 || !numberRegex.test(mobileStr)) {
        throw new apiErrorHandler(400, "Invalid Mobile No");
    }
};


export const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new apiErrorHandler(400, "Invalid Email Format");
    }
};



// For email
