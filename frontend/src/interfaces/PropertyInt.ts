interface Image {
  url: string;
}

interface rulesRegulation {
  no: string;
  rules: string;
}

interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
}

export enum PropertyType {
  residential = "residential",
  Commercial = "commercial",
  Industrial = "industrial",
  Land = "land",
  Villas = "villas"
}

export interface Features {
  parking: boolean;
  petFriendly: boolean;
  security: boolean;
  swimmingPool: boolean;
  playGround: boolean;
  garden: boolean;
  publicToilet: boolean;
  clubHouse: boolean;
  temple: boolean;
  balcony: boolean;
  cctv: boolean;
  lift: boolean;
  forSell : boolean;  // use ! for rent 
  noOfRooms: number;
  noOfRestRooms: number;
  noOfLivingRoom : number;
  sqFt: string
  propertyType: PropertyType | "";
}

export interface PropertyInt {
  propertyName: string;
  propertyDesc: string;
  images: Image[];
  address: Address;
  price: number;
  discountedPrice: number;
  features: Features;
  rules: rulesRegulation[];
  _id: string;
}
