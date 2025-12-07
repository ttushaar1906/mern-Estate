import axios from "axios";
import {
  createProperty,
  generateDescription,
  updateProperty,
} from "../../apis/properiesAPI";
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

export const updatePropertyFn = async (
  id: string,
  data: {
    formValues: PropertyInt;
    newImages: File[];
    removeImages: string[];
  }
) => {
  const formData = new FormData();

  // 1️⃣ Append JSON "data" as string (backend parses req.body.data)
  formData.append(
    "data",
    JSON.stringify({
      ...data.formValues,
      removeImages: data.removeImages,
    })
  );

  // 2️⃣ Append new image files (backend reads req.files[])
  data.newImages.forEach((img: File) => {
    formData.append("images", img);
  });

  // 3️⃣ API call
  const response = await axios.patch(updateProperty(id!), formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const generateDescriptionFn = async (prompt: String) => {
  const response = await axios.post(generateDescription, {prompt}, {
    withCredentials: true,
  });
  return response.data;
};
