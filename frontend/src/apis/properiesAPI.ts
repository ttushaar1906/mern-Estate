// const dbHost = "http://localhost:3000/api/listing";
const dbHost = "https://findstay.onrender.com/api/listing";

export const getCheapProperties = `${dbHost}/gets`;
export const getProperties = (page = 1, search = "") =>
  `${dbHost}/gets?page=${page}&query=${encodeURIComponent(search)}`;
export const createProperty = `${dbHost}/create`;
export const ownerProperty = `${dbHost}/viewOwnersProperty`;
export const getProperty = (id: string) => `${dbHost}/getListing/${id}`;
export const deleteProperty = (id: string) => `${dbHost}/deletePropety/${id}`;
export const toggleSold = (id: string) => `${dbHost}/changeStatus/${id}`;
export const updateProperty = (id:string)=> `${dbHost}/updateProperty/${id}`;