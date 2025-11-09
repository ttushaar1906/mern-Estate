import Listing from "../models/listing.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js"
import { apiErrorHandler } from "../utils/error.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { v2 as cloudinary } from 'cloudinary'; // assuming you're using this
import client from "../utils/redis.js";

export const createListing = asyncHandler(async (req, res) => {
  const { propertyName, propertyDesc, price, discountedPrice, RegisteredBy, images } = req.body
  const address = JSON.parse(req.body.address);
  const features = JSON.parse(req.body.features);
  const rules = JSON.parse(req.body.rules);

  const nonZeroFields = [
    { name: "price", value: price },
    { name: "discountedPrice", value: discountedPrice },
    { name: "noOfRooms", value: features.noOfRooms },
    { name: "noOfRestRooms", value: features.noOfRestRooms },
    { name: "No of Living Room", value: features.noOfLivingRoom },
    { name: "sqFt", value: features.sqFt }
  ];

  const errorList = nonZeroFields
    .filter(field => Number(field.value) < 0)
    .map(field => field.name);

  if (errorList.length > 0) {
    return res.status(400).json({
      statusCode: 400,
      message: `The following fields must be non-negative: ${errorList.join(", ")}`
    });
  }

  // 1. Handle multiple image uploads
  const coverImageFiles = req.files?.coverImages || [];
  const coverImageUrls = [];

  for (let file of coverImageFiles) {
    const uploadResult = await cloudinaryUpload(file.path);
    if (uploadResult?.secure_url) {
      coverImageUrls.push({ url: uploadResult.secure_url, public_id: uploadResult.public_id });
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
  const { query, limit = 15, page = 1 } = req.query;
  const cacheKey = `propertyList:${query || 'all'}:page${page}:limit${limit}`;

  // Check cache
  const cachedData = await client.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  // Fetch from MongoDB
  const searchConditions = [];
  if (query) {
    searchConditions.push({
      $or: [
        { propertyName: { $regex: `^${query}`, $options: "i" } },
        { "address.city": { $regex: `${query}`, $options: "i" } },
        { "address.state": { $regex: `${query}`, $options: "i" } },
      ]
    });
  }

  const finalFilter = searchConditions.length ? { $and: searchConditions } : {};
  const skip = (page - 1) * limit;

  const result = await Listing.find(finalFilter).skip(skip).limit(Number(limit));
  const total = await Listing.countDocuments(finalFilter);

  const responseData = {
    data: result,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };

  // Store in cache for 5 minutes
  await client.set(cacheKey, JSON.stringify(responseData), { EX: 300 });
  // console.log(`🗄️ Cached key: ${cacheKey}`);
  return res.status(200).json(responseData);
});

export const viewOwnerProperty = asyncHandler(async (req, res) => {
  const { userName } = req.user
  const cacheKey = "ownerProperty";
  
  // Check cache
  const cachedData = await client.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  const propertyResponse = await Listing.find({ RegisteredBy: userName })

  if (!propertyResponse || propertyResponse.length === 0) return res.status(400).json({ statusCode: 400, message: "No Property Registered by the owner" })
    

   const responseData = {
  statusCode: 200,
  message: "Property Found with current user",
  propertyResponse
};

await client.set(cacheKey, JSON.stringify(responseData), { EX: 300 });
return res.status(200).json(responseData);

  // await client.set(cacheKey, JSON.stringify(propertyResponse), { EX: 300 })
  // return res.status(200).json({ statusCode: 200, message: "Property Found with current user", propertyResponse })
})

export const deletePropety = asyncHandler(async (req, res) => {
  const { userName } = req.user
  const currentListing = await Listing.findById(req.params.id)

  if (!currentListing || currentListing.length === 0) return res.status(400).json({ statusCode: 400, message: "No Listing with this Id" })

  if (currentListing.RegisteredBy !== userName) return res.status(403).json({ statusCode: 403, message: "You are not allowed to modify this listing" })

  for (let image of currentListing.images) {
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  }
  await currentListing.deleteOne()
  return res.status(200).json({ statusCode: 200, message: "Listing Deleted Successfully !!" })

})

export const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const fieldsToUpdate = ["propertyName", "propertyDesc", "price", "discountedPrice"]
  // const address = { line1, line2, city, state, postalCode }
  const updateFields = {}

  fieldsToUpdate.map((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field]
    }
  })

  const updatedResult = await Listing.findByIdAndUpdate(id, updateFields, { new: true })

  return res.status(200).json(new apiResponse(200, updatedResult, "Property Updated Successfully"));
});


export const toggleSold = asyncHandler(async (req, res) => {
  // const { isSold } = req.body
  const _id  = req.params.id  

  const result = await Listing.findByIdAndUpdate(_id, [{ $set: { isSold: { $not: "$isSold" } } }], { new: true })
  
  if (!result) {
    throw new apiErrorHandler(400, "Failed to change status");
  }

  return res.status(200).json(new apiResponse(200, result, "Status Changed"))

})
