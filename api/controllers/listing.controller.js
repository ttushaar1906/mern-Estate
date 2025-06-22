import Listing from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js"
import { apiErrorHandler } from "../utils/error.js";
import { nameValidation } from "../utils/validationFile.js"
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { v2 as cloudinary } from 'cloudinary'; // assuming you're using this

// for update use redux and for delete also

export const createListing = asyncHandler(async (req, res) => {
  // images
  const { propertyName, propertyDesc, address, price, discountedPrice, features, rules, RegisteredBy, images } = req.body

  nameValidation(propertyName)

  const { line1, line2, city, state, postalCode } = address
  nameValidation(city)
  nameValidation(state)

  const { parking, petFriendly, security, swimmingPool, playGround, garden, publicToilet, clubHouse, temple, balcony, cctv, lift, forSell, noOfRooms, noOfRestRooms, noOfLivingRoom, sqFt, propertyType } = features

  // 1. Handle multiple image uploads
  const coverImageFiles = req.files?.coverImages || [];
  const coverImageUrls = [];

  for (let file of coverImageFiles) {
    const uploadResult = await cloudinaryUpload(file.path);
    if (uploadResult?.secure_url) {
      coverImageUrls.push({ url: uploadResult.secure_url,public_id: uploadResult.public_id });
    }
  }
  const { userName } = req.user

  const response = await Listing.create({
    propertyName,
    propertyDesc,
    address,
    price,
    discountedPrice,
    features,
    rules,
    RegisteredBy: userName || "Unknown",
    images: coverImageUrls
  })
  return res.status(200).json(new apiResponse(200, response, "Property Registered Successfully !"))
})

// Single View
export const viewListing = asyncHandler(async (req, res) => {
  const response = await Listing.findById(req.params.id)
  if (!response) throw new apiErrorHandler(400, "Failed to Fetch Property !!")
  return res.status(200).json(new apiResponse(200, response, "Property Fetched"))
})

export const getlisting = asyncHandler(async (req, res) => {
  const { query, limit = 15, page = 1 } = req.query

  const searchConditions = []
  if (query) {
    searchConditions.push({
      $or: [
        { name: { $regex: `^${query}`, $options: "i" } },
        { "address.city": { $regex: `${query}`, $options: "i" } },
        { "address.state": { $regex: `${query}`, $options: "i" } },
      ]
    })
  }

  const finalFilter = searchConditions.length ? { $and: searchConditions } : {};

  const skip = (page - 1) * limit;

  const result = await Listing.find(finalFilter)
    .skip(skip)
    .limit(Number(limit));

  const total = await Listing.countDocuments(finalFilter);

  return res.status(200).json({
    data: result,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
});

export const viewOwnerProperty = asyncHandler(async (req, res) => {
  const { userName } = req.user

  const propertyResponse = await Listing.find({ RegisteredBy: userName })

  if (!propertyResponse || propertyResponse.length === 0) return res.status(400).json({ statusCode: 400, message: "No Property Registered by the owner" })

  return res.status(200).json({ statusCode: 200, message: "Property Found with current user", propertyResponse })
})

export const deletePropety = asyncHandler(async (req, res) => {
  const { userName } = req.user
  const currentListing = await Listing.findById(req.params.id)

  if(!currentListing || currentListing.length === 0 ) return res.status(400).json({statusCode:400, message:"No Listing with this Id"})
    
  if(currentListing.RegisteredBy !== userName) return res.status(403).json({statusCode:403, message:"You are not allowed to modify this listing"})

      for (let image of currentListing.images) {
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  }
  await currentListing.deleteOne()  
  return res.status(200).json({statusCode:200, message: "Listing Deleted Successfully !!" })

})

//   // try {
//   //   const limit = parseInt(req.query.limit) || 9;
//   //   const startIndex = parseInt(req.query.startIndex) || 0
//   //   let offer = req.query.offer;

//   //   if (offer === undefined || offer === 'false') {
//   //     offer = { $in: [false, true] }
//   //   }

//   //   let furnished = req.query.furnished;
//   //   if (furnished === undefined || furnished === 'false') {
//   //     furnished = { $in: [true, false] }
//   //   }

//   //   let parking = req.query.parking;
//   //   if (parking === undefined || parking === 'false') {
//   //     parking = { $in: [false, true] }
//   //   }

//   //   let type = req.query.type;
//   //   if (type === undefined || type === 'all') {
//   //     type = { $in: ['sale', 'rent'] };
//   //   }

//   //   const searchTerm = req.query.searchTerm || '';

//   //   const sort = req.query.sort || 'createdAt';

//   //   const order = req.query.order || 'desc';

//   //   const listings = await Listing.find({
//   //     $or: [
//   //       { name: { $regex: searchTerm, $options: 'i' } },  //Regex means search any word in a line or title
//   //       { address: { $regex: searchTerm, $options: 'i' } },
//   //     ],
//   //     offer,
//   //     furnished,
//   //     parking,
//   //     type,
//   //   }).sort(
//   //     { [sort]: order }
//   //   ).limit(limit).skip(startIndex);

//   //   return res.status(200).json(listings)

//   // }