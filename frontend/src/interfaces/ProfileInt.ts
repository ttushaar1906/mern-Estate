// This data will come from api and change img to avatar

export interface ProfileIn{
    avatar:string | "",
    userName: string,
    userEmail:string,
    mobileNo : number | null, 
    joinInDate: string | "", 
    password:string
}

export interface UserLoginInt{
    userEmail : string,
    password: string
}