// This data will come from api and change img to avatar

export interface ProfileIn{
    avatar:string | "",
    name: string,
    email:string,
    mobileNo : number | null, 
    joinInDate: string | "", 
    password:string
}