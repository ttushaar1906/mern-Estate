import axios from "axios";
import { createProperty } from "../../apis/properiesAPI";
import { PropertyInt } from "../../interfaces/PropertyInt";

export const createPropertyFn = async (propertyData: PropertyInt) => {
  const formData = new FormData();

  // Stringify complex nested fields
  formData.append("propertyName", propertyData.propertyName);
  formData.append("propertyDesc", propertyData.propertyDesc);
  formData.append("price", propertyData.price.toString());
  formData.append("discountedPrice", propertyData.discountedPrice.toString());
  formData.append("address", JSON.stringify(propertyData.address));
  formData.append("features", JSON.stringify(propertyData.features));
  formData.append("rules", JSON.stringify(propertyData.rules));

  // Handle images
  for (const img of propertyData.images) {
    if (img.url.startsWith("data:") || img.url.startsWith("blob:")) {
      try {
        const res = await fetch(img.url);
        const blob = await res.blob();
        const file = new File([blob], "image.png", { type: blob.type });
        formData.append("coverImages", file);
      } catch (err) {
        console.error("Failed to convert image:", img.url, err);
      }
    }
  }

  const response = await axios.post<PropertyInt>(createProperty, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};