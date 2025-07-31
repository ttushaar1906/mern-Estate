export interface scheduleHomeTourInt {
  visitorName: string;
  noOfVisitingPeople: number;
  visitingTime: string;
  visitingDate: string;
  visitingPropertyName: string;
  propertyImg: string;
  propertyAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
  };
  isCancelled:boolean | "",
  _id:string |""
}
