"use client";

import { PostModel } from "@/app/graphql/__generated__/graphql";
import { INCREMENT_BLOG_VIEWS } from "@/app/graphql/mutaions/blog.mutations";
import { getGuestIdentifier } from "@/app/utils/fingerprint";
import { useMutation } from "@apollo/client/react";
import { useEffect, useRef } from "react";

interface ReadTrackProps {
  blogId: string;
}
export const ReadTrack = ({ blogId }: ReadTrackProps) => {
  const hasTracked = useRef(false);

  const [incrementViews, { loading, data, reset, error }] =
    useMutation<PostModel>(INCREMENT_BLOG_VIEWS);

  useEffect(() => {
    if (!hasTracked.current) {
      const trackViewWithIdentifier = async () => {
        try {
          await new Promise((resolver) => setTimeout(resolver, 3000));

          const guestId = await getGuestIdentifier();

          // console.log("Tracking view with identifier:", guestId);

          // mutation
          const result = await incrementViews({
            variables: {
              id: blogId,
              identifier: guestId,
            },
          });

          // console.log("View tracked:", result.data?.views);

          hasTracked.current = true;
        } catch (error) {
          console.error({ error });
        } finally {
        }
      };

      trackViewWithIdentifier();
    }
  }, [blogId, incrementViews]);

  return null;
};
