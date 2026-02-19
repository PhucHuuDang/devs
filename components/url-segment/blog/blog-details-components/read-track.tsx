"use client";

import { useEffect, useRef } from "react";

import { useIncrementPostViewsMutation } from "@/app/graphql/__generated__/generated";
import { getGuestIdentifier } from "@/app/utils/fingerprint";

interface ReadTrackProps {
  blogId: string;
}

export const ReadTrack = ({ blogId }: ReadTrackProps) => {
  const hasTracked = useRef(false);
  const [incrementViews] = useIncrementPostViewsMutation();

  useEffect(() => {
    if (!hasTracked.current) {
      const trackViewWithIdentifier = async () => {
        try {
          await new Promise((resolver) => setTimeout(resolver, 3000));

          const guestId = await getGuestIdentifier();

          await incrementViews({
            variables: {
              id: blogId,
              identifier: guestId,
            },
          });

          hasTracked.current = true;
        } catch (error) {
          console.error("Failed to track view:", error);
        }
      };

      trackViewWithIdentifier();
    }
  }, [blogId, incrementViews]);

  return null;
};
