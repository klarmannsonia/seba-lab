import clearCache from "../services/cache.js";

const cleanCache = async (req, res, next) => {
  await next();

  console.log("CACHE CLEARED");
  clearCache(req.user._id);
};

export default cleanCache;
