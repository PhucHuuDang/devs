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
import { UploadImage } from "@/components/_images/upload-image";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateSlug } from "@/lib/generate";
import { TextareaControlled } from "@/components/custom/form/fields/text-area-controlled";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 10 characters.",
  }),

  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  tags: z
    .array(
      z.object({
        key: z.string(),
        name: z.string(),
      })
    )
    .min(1, {
      message: "At least one tag is required.",
    }),
  mainImage: z.string().url({
    message: "Main image must be a valid URL.",
  }),
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

  const [mainImage, setMainImage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      mainImage: "",
      tags: [TABS[0]! as TTag],
    },
    // mode: "onChange",

    // reValidateMode: "onChange",
  });

  const handleMainImageUploadSuccess = (url: string | string[]) => {
    console.log({ url });
    if (!Array.isArray(url)) {
      // setMainImage(url);
      form.setValue("mainImage", url);
      return;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  // if (loading) return <p>Đang tải...</p>;
  // if (error) return <p>Lỗi: {error.message}</p>;

  const cardStyle = `hover:border-primary/20 rounded-3xl  transition-all duration-300`;

  const watchTitle = form.watch("title");

  useEffect(() => {
    if (typeof watchTitle === "string") {
      form.setValue("slug", generateSlug(watchTitle));
    }
  }, [watchTitle]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full container mx-auto   ">
      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        className="flex flex-col gap-4 col-span-2"
      >
        <div className="w-full flex flex-col gap-4">
          <Card className={cardStyle}>
            <CardHeader>
              <CardTitle>Title of the blog</CardTitle>
              <CardDescription>
                Lets make the title interesting and catchy - This will be the
                first thing people see when they land on your blog post.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <InputControlled
                name="title"
                label=""
                placeholder="Technologies..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Slug</CardTitle>
              <CardDescription>
                This is the URL segment that will be used to access your blog
                post. It should be unique and descriptive.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <InputControlled
                name="slug"
                label=""
                placeholder="slug-of-the-blog"
                disabled
              />
            </CardContent>
          </Card>

          {/* {form.getValues("mainImage") && (
            <Image
              src={form.getValues("mainImage")}
              alt="Main Image"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-md max-w-lg mx-auto"
            />
          )} */}

          <div className="sticky top-0 col-span-1">
            <UploadImage
              onUploadSuccess={handleMainImageUploadSuccess}
              className="w-full h-full object-cover rounded-md max-w-lg mx-auto"
              classNameIcon="size-16"
              classContainer="w-full h-96 object-cover rounded-md mx-auto border-2 border-dashed border-primary/20 p-4"
            />

            {form.getValues("mainImage") && (
              <Image
                src={form.getValues("mainImage")}
                alt="Main Image"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-md max-w-lg mx-auto"
              />
            )}

            {form.formState.errors["mainImage"]?.message && (
              <p className="text-rose-500 text-sm">
                {form.formState.errors["mainImage"]?.message}
              </p>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription>
                Write a detailed description of the blog post...
              </CardDescription>
            </CardHeader>

            <CardContent>
              <TextareaControlled
                name="description"
                label=""
                // control={form.control}
                placeholder="Write a detailed description of the blog post..."
              />
            </CardContent>
          </Card>
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

        {form.getValues("mainImage") && (
          <Image
            src={form.getValues("mainImage")}
            alt="Main Image"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-md max-w-lg mx-auto"
          />
        )}
      </FormWrapper>

      <div className="sticky top-0 col-span-1">
        <UploadImage onUploadSuccess={handleMainImageUploadSuccess} />

        {form.formState.errors["mainImage"]?.message && (
          <p className="text-rose-500 text-sm">
            {form.formState.errors["mainImage"]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
