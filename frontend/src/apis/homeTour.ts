const dbHost = "http://localhost:3000/api/homeVisit";

export const viewHomeTour = `${dbHost}/viewHomeTour`
export const scheduleHomeTour = `${dbHost}/scheduleHomeTour`
export const cancelHomeTour = (id:string) => `${dbHost}/cancelHomeTour/${id}`