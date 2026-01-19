import React, { useCallback, useEffect, useRef, useState } from "react";

import { ImagesIcon, ImageUpIcon } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface UploadImageProps {
  isMultiple?: boolean;
  onUploadSuccess?: (imageUrl: string | string[]) => void;

  classNameIcon?: string;
  className?: string;

  classContainer?: string;

  error?: boolean;
}
export const UploadImage = ({
  isMultiple,
  onUploadSuccess,
  classNameIcon,
  className,
  classContainer,
  error = false,
}: UploadImageProps) => {
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  // Fix body scroll after widget closes
  useEffect(() => {
    // Ensure body can scroll
    const restoreScroll = () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
    };

    // Restore scroll on mount and cleanup
    restoreScroll();

    return () => {
      restoreScroll();
    };
  }, []);

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const uploadUrl = (result?.info as CloudinaryUploadWidgetInfo)?.secure_url;
    if (!uploadUrl) return;
    if (isMultiple) {
      setImageUrl((prev) => [...prev, uploadUrl]);
      onUploadSuccess?.([...imageUrl, uploadUrl]);
    } else {
      setImageUrl([uploadUrl]);
      onUploadSuccess?.(uploadUrl);
    }
    toast.success("Upload successful!");

    // Restore scroll after upload
    setTimeout(() => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
    }, 100);
  };

  const handleUploadError = (error: unknown) => {
    console.error(error);
    toast.error("Upload error: " + (error as Error).message);
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset="ejurtv4l"
        // uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onSuccess={async (result, { widget }) => {
          handleUploadSuccess(result);
        }}
        onClose={() => {
          setProgress(0);
          // Restore body scroll when widget closes
          setTimeout(() => {
            document.body.style.overflow = "unset";
            document.body.style.position = "unset";
          }, 100);
        }}
        onError={handleUploadError}
        options={{
          multiple: isMultiple,
          resourceType: "image",
          folder: "blog-images",
          tags: ["blog", "image"],
          context: {
            alt: "Blog image",
          },

          maxImageFileSize: 1024 * 1024 * 5, // 5MB
        }}
      >
        {({ open, results, cloudinary, widget, isLoading, isShowing }) => {
          return (
            <div
              className={cn(
                "cursor-pointer group border-dashed border-2 w-fit p-2 rounded-md",
                classContainer,
              )}
              onClick={() => open()}
            >
              <div
                className={cn(
                  "flex flex-col items-center gap-2 justify-center",
                  className,
                )}
              >
                {isMultiple ? (
                  <ImagesIcon
                    className={cn(
                      "size-20 cursor-pointer group-hover:scale-110 transition-all duration-300 group-hover:text-primary/80 ",
                      error && "text-rose-500",
                      classNameIcon,
                    )}
                  />
                ) : (
                  <>
                    <ImageUpIcon
                      className={cn(
                        "size-20 cursor-pointer group-hover:scale-110 transition-all duration-300 group-hover:text-primary/80 ",
                        error && "text-rose-500",
                        classNameIcon,
                      )}
                    />
                  </>
                )}
                <span
                  className={cn(
                    "text-sm text-primary/80 font-medium group-hover:text-primary/100 transition-all duration-300",
                    error && "text-rose-500",
                  )}
                >
                  {isMultiple
                    ? "Click to upload multiple images"
                    : "Click to upload image"}
                </span>
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
