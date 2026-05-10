const DEFAULT_UPLOAD_FOLDER = "monblog/posts";

const placeholderValues = new Set([
  "your-cloud-name",
  "your-api-key",
  "your-api-secret",
]);

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME?.trim() ?? "",
  apiKey: process.env.CLOUDINARY_API_KEY?.trim() ?? "",
  apiSecret: process.env.CLOUDINARY_API_SECRET?.trim() ?? "",
  uploadFolder:
    process.env.CLOUDINARY_UPLOAD_FOLDER?.trim() || DEFAULT_UPLOAD_FOLDER,
};

export function isCloudinaryConfigured() {
  return (
    Boolean(cloudinaryConfig.cloudName) &&
    Boolean(cloudinaryConfig.apiKey) &&
    Boolean(cloudinaryConfig.apiSecret) &&
    !placeholderValues.has(cloudinaryConfig.cloudName) &&
    !placeholderValues.has(cloudinaryConfig.apiKey) &&
    !placeholderValues.has(cloudinaryConfig.apiSecret)
  );
}

export function assertCloudinaryConfigured() {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured yet. Replace the placeholder Cloudinary values in .env.local before uploading an image.",
    );
  }
}
