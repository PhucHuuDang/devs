"use client";

import { useQuery } from "@apollo/client/react";
import { GET_POSTS } from "@/app/graphql/queries/post.queries";
import FormWrapper from "@/components/custom/form/form-wrapper";
import z from "zod";
import { FieldValues, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { InputControlled } from "@/components/custom/form/fields/input-controlled";
import { PasswordControlled } from "@/components/custom/form/fields/password-controlled";
import { MultiSelectControlled } from "@/components/custom/form/fields/multi-select-controlled";
import { TTag } from "@/components/ui/multiple-select";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  tags: z.array(
    z.object({
      key: z.string(),
      name: z.string(),
    })
  ),
});

export const TABS = [
  { key: "web-development", name: "Web Development" },
  { key: "javascript", name: "JavaScript" },
  { key: "typescript", name: "TypeScript" },
  { key: "react", name: "React" },
  { key: "nextjs", name: "Next.js" },
  { key: "nodejs", name: "Node.js" },
  { key: "graphql", name: "GraphQL" },
  { key: "api-development", name: "API Development" },
  { key: "css", name: "CSS" },
  { key: "html", name: "HTML" },
  { key: "design-systems", name: "Design Systems" },
  { key: "tailwind-css", name: "Tailwind CSS" },
  { key: "animations", name: "Animations" },
  { key: "gsap", name: "GSAP" },
  { key: "zustand", name: "Zustand" },
  { key: "redux", name: "Redux" },
  { key: "testing", name: "Testing" },
  { key: "accessibility", name: "Accessibility" },
  { key: "seo", name: "SEO" },
  { key: "performance", name: "Performance" },
];

const BlogsPage = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      tags: [TABS[0]! as TTag],
    },
    // mode: "onChange",

    // reValidateMode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  // if (loading) return <p>Đang tải...</p>;
  // if (error) return <p>Lỗi: {error.message}</p>;

  console.log({ data });

  return (
    <div className="p-4 mt-10 rounded-2xl border-2 border-dashed border-primary/10">
      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <div className="w-full">
          <InputControlled
            name="username"
            label="Username"
            placeholder="Enter your username"
          />

          <PasswordControlled
            name="password"
            label="Password"
            // control={form.control}
            placeholder="Enter your password"
          />
          <div>
            <MultiSelectControlled name="tags" label="Tags" options={TABS} />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md mt-4"
        >
          Submit
        </button>
      </FormWrapper>

      <div className="mt-10">
        <CldUploadWidget
          uploadPreset="ejurtv4l"
          // uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          onSuccess={(result, { widget }) => {
            console.log({ result, widget });
            console.log(
              (result?.info as CloudinaryUploadWidgetInfo)?.secure_url
            );
          }}
          onClose={() => {
            toast.success("Upload closed");
          }}
          onError={(error) => {
            toast.error("Upload error: " + error);
          }}
        >
          {({ open, results, cloudinary, widget }) => {
            return (
              <button type="button" onClick={() => open()}>
                Upload
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default BlogsPage;
