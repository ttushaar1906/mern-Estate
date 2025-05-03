export const asyncHandler = (functionName) =>{
    return (req, res,next) => {
    Promise.resolve(functionName(req, res,next))
    .catch((err) => next(err))
}}