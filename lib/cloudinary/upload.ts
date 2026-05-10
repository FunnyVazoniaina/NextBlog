import { assertCloudinaryConfigured, cloudinaryConfig } from "@/lib/cloudinary/config";

interface UploadPostCoverImageInput {
  file: File;
  slug: string;
}

interface CloudinaryUploadResponse {
  secure_url?: string;
  error?: {
    message?: string;
  };
}

const allowedImageExtensions = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

function isSupportedImageFile(file: File) {
  return (
    file.type.startsWith("image/") || allowedImageExtensions.test(file.name)
  );
}

function getCloudinaryAuthorizationHeader() {
  const credentials = `${cloudinaryConfig.apiKey}:${cloudinaryConfig.apiSecret}`;

  return `Basic ${Buffer.from(credentials).toString("base64")}`;
}

export async function uploadPostCoverImage({
  file,
  slug,
}: UploadPostCoverImageInput) {
  assertCloudinaryConfigured();

  if (!file.size) {
    throw new Error("The selected image file was empty.");
  }

  if (!isSupportedImageFile(file)) {
    throw new Error("Please choose a valid image file before publishing.");
  }

  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("folder", cloudinaryConfig.uploadFolder);
  formData.append("public_id", slug);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    {
      method: "POST",
      headers: {
        Authorization: getCloudinaryAuthorizationHeader(),
      },
      body: formData,
      cache: "no-store",
    },
  );

  const payload = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok) {
    throw new Error(
      payload.error?.message ||
        "Cloudinary rejected the image upload. Please verify your Cloudinary configuration.",
    );
  }

  if (!payload.secure_url) {
    throw new Error("Cloudinary did not return a usable image URL.");
  }

  return payload.secure_url;
}
