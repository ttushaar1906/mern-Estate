const dbHost = "http://localhost:3000"

// export const getProperties = `${dbHost}/api/listing/gets`
export const getProperties = "http://localhost:3000/api/listing/gets"

console.log(getProperties);

export const getProperty =  `${dbHost}/api/listing/getListing/:id`