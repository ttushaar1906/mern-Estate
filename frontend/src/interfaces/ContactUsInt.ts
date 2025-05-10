export interface freqAskQuesInt {
    question : string,
    answer: string
}

export interface ContactUsInt {
    fullName:string,
    email:string,
    mobileNo: string,
    propertyType: "" | "residential" | "Commerical" | "Industrial" | "Land" | "Villa";
    inquiresType:"" |"Buying" | "Selling" | "Renting" |"Other"
    message:string
}