const dbHost = "http://localhost:3000";

export const getCheapProperties = `${dbHost}/api/listing/gets`;
export const getProperties = (page = 1, search = "") =>
    `${dbHost}/api/listing/gets?page=${page}&query=${encodeURIComponent(search)}`;
export const getProperty = (id: string) => `${dbHost}/api/listing/getListing/${id}`;
export const createProperty = `${dbHost}/api/listing/create`
export const ownerProperty = `${dbHost}/api/listing/viewOwnersProperty`