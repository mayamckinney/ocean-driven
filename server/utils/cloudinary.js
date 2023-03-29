const cloudName = "dqa3bfehe";
const apiKey = "126784985796773";
const apiSecret = "0RphSS1Sc7hWTy0WfdjFeGTdJ0k";
const fetch = require("node-fetch");

const getImages = async (imageName) => {
  try {
    const response = await fetch(
      `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/resources/image`
    );
    const data = await response.json();
    const imageUrls = data.resources.map((resource) => resource.url);

    // filter out images that don't start with the imageName
    const filteredImageUrls = imageUrls.filter((url) => {
      // Get the image name from the url
      const start = url.lastIndexOf("/") + 1;
      const end = url.lastIndexOf(".");
      const cloudImage = url.substring(start, end);
      const includesString = cloudImage.includes(imageName);
      return includesString;
    });
    return filteredImageUrls;
  } catch (err) {
    console.log("error:", err);
  }
};

module.exports = { getImages };
