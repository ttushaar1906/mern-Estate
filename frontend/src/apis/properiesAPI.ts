const dbHost = "http://localhost:3000";

export const getProperties = `${dbHost}/api/listing/gets`;
export const getProperty = (id: string) => `${dbHost}/api/listing/getListing/${id}`;
export const createProperty = `${dbHost}/api/listing/create`
export const ownerProperty = `${dbHost}/api/listing/viewOwnersProperty`