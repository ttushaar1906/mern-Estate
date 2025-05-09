import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// export const deleteListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     return next(apiErrorHandler(404, "Listing not found !!"))
//   }
//   if (req.user.id !== listing.userRef) {
//     return next(apiErrorHandler(401, "You can only delete your listing "))
//   }
//   try {
//     await Listing.findByIdAndDelete(req.params.id)
//     res.status(200).json('Listing has been removed! ')
//   } catch (error) {
//     next(error)
//   }

// }

// export const updateListing = async (req, res, next) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     return next(errorHandler(404, "Listing not found! "));
//   }
//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(401, "You can only update your own listing"))
//   }
//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedListing)
//   } catch (error) {
//     next(error)
//   }
// }

export const viewListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not Found!!'))
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error)
  }
}

export const getlisting = async (req, res, next) => {
  try {
    const response = await Listing.find()
    if (response.length === 0) return next(errorHandler(400, 'Listing not Found!!'))
      
    return res.status(200).json(response)
  }
  catch (error) {
    next(error)
  }
}

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