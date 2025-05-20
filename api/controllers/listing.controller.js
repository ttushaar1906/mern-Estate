import Listing from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js"
import { apiErrorHandler } from "../utils/error.js";
import { nameValidation } from "../utils/validationFile.js"
import User from "../models/user.module.js";

// for update use redux and for delete also

export const createListing = asyncHandler(async (req, res) => {
  // images
  const { propertyName, propertyDesc, address, price, discountedPrice, features, rules,RegisteredBy } = req.body

  nameValidation(propertyName)

  const { line1, line2, city, state, postalCode } = address
  nameValidation(state)
  nameValidation(city)

  const { parking, petFriendly, security, swimmingPool, playGround, garden, publicToilet, clubHouse, temple, balcony, cctv, lift, forSell, noOfRooms, noOfRestRooms, noOfLivingRoom, sqFt, propertyType } = features

  const {id:userId, name} = req.user.id
  console.log(name);
  

  const response = await Listing.create({
    propertyName,
    propertyDesc, 
    address,
    price,
    discountedPrice, 
    features, 
    rules,
    RegisteredBy:name || "not found"
  })
  return res.status(200).json(new apiResponse(200, response, "Property Registered Successfully !"))
})

// export const createListing = async (req, res, next) => {
//   try {
//     const listing = await Listing.create(req.body);
//     return res.status(201).json(listing);
//   } catch (error) {
//     next(error);
//   }
// };

// Single View
export const viewListing = asyncHandler(async (req, res) => {
  const response = await Listing.findById(req.params.id)
  if (!response) throw new apiErrorHandler(400, "Failed to Fetch Property !!")
  return res.status(200).json(new apiResponse(200, response, "Property Fetched"))
})


export const getlisting = asyncHandler(async (req, res) => {
  const { query, sort, petFriendly, parking, limit = 15, page = 1 } = req.query

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

  if (petFriendly !== undefined) {
    searchConditions.push({ petFriendly: petFriendly === "true" });
  }

  // Parking filter
  if (parking !== undefined) {
    searchConditions.push({ parking: parking === "true" });
  }

  // Combine all conditions (AND logic)
  const finalFilter = searchConditions.length ? { $and: searchConditions } : {};

  // Sort options
  let sortOption = {};
  if (sort === "priceAsc") sortOption = { price: 1 };
  else if (sort === "priceDesc") sortOption = { price: -1 };
  const skip = (page - 1) * limit;

  const result = await Listing.find(finalFilter)
    .sort(sortOption)
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