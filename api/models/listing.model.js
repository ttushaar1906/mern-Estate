import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
})

const ImageSchema = new mongoose.Schema({
    url: String
})

const FeaturesSchema = new mongoose.Schema({
      parking: Boolean,
      petFriendly: Boolean,
      security: Boolean,
      swimmingPool: Boolean,
      playGround: Boolean,
      garden: Boolean,
      publicToilet: Boolean,
      clubHouse: Boolean,
      temple: Boolean,
      balcony: Boolean,
      cctv: Boolean,
      lift: Boolean,
      forSell : Boolean,  // use ! for rent 
      noOfRooms: Number,
      noOfRestRooms: Number,
      noOfLivingRoom : Number,
      sqFt: String,
      propertyType: {
        enum: ["residential", "commercial","industrial","land", "villas"]
      },
})

const RulesSchema = new mongoose.Schema({
    rulesRegulation: {
        no: String,
        rules: String,
      }
})

const listingSchema = new mongoose.Schema({
    propertyName: {
        type: String,
        // required: true,
    },
    propertyDesc: {
        type: String,
        // required: true,
    },
    images: {
        type: [ImageSchema]
    },
    address: addressSchema,
    price:{
        type:Number
    },
    discountedPrice: {
        type: Number,
    },
    features:{
        type:FeaturesSchema
    },
    rules:{
        type:RulesSchema
    },
    RegisteredBy:{
        type:String
    }



    // userRef: {
    //     type: String,
    //     required: true,
    // }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;
