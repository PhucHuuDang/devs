"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";
import { Value } from "platejs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { generateSlug } from "@/lib/generate";

import { CreateBlogMutation } from "@/app/graphql/__generated__/graphql";
import { CREATE_BLOG } from "@/app/graphql/mutaions/blog.mutations";
import { GET_POSTS } from "@/app/graphql/queries/blog.queries";
import { InputControlled } from "@/components/custom/form/fields/input-controlled";
import { MultiSelectControlled } from "@/components/custom/form/fields/multi-select-controlled";
import { SelectControlled } from "@/components/custom/form/fields/select-controlled";
import { TextareaControlled } from "@/components/custom/form/fields/text-area-controlled";
import FormWrapper from "@/components/custom/form/form-wrapper";
import { UploadImage } from "@/components/images/upload-image";
import { SimpleLoading } from "@/components/loading-components/simple-loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form";
import { TTag } from "@/components/ui/multiple-select";
import { categoryOptions } from "@/mock/category";
import { TAGS } from "@/mock/tags";
import { useDebounce } from "@/stores/use-debounce";
import { cardStyle } from "@/styles/common-style";

import { PreviewControl } from "./preview-control";

const PlateEditor = dynamic(
  () =>
    import("@/components/editor/plate-editor").then((mod) => mod.PlateEditor),
  {
    ssr: false,
    loading() {
      return <SimpleLoading />;
    },
  },
);

export const updateBlogSchema = z.object({
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
      }),
    )
    .min(1, {
      message: "At least one tag is required.",
    }),
  mainImage: z.string().url({
    message: "Main image must be a valid URL.",
  }),

  categoryId: z.string().min(1, {
    message: "CategoryId is required.",
  }),

  content: z.array(z.any()),

  authorId: z.string({
    error: "Author ID is required.",
  }),

  isPublished: z.boolean().default(false).optional(),
  isFeatured: z.boolean().default(false).optional(),
});

export const UpdateBlog = () => {
  const { data, loading, error } = useQuery(GET_POSTS);
  const [
    createBlog,
    {
      loading: createBlogLoading,
      error: createBlogError,
      data: createBlogData,
      called,
      reset,
    },
  ] = useMutation(CREATE_BLOG);

  const [content, setContent] = useState<Value>([]);

  const form = useForm<z.infer<typeof updateBlogSchema>>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      mainImage: "",
      tags: [TAGS[0]! as TTag],
      categoryId: categoryOptions[0]!.value,
      authorId: "cmi5g7m410000gp9lnw00zmbb",
      isPublished: false,
      // isFeatured: false,
    },
  });

  // console.log(form.formState.errors);

  const handleMainImageUploadSuccess = (url: string | string[]) => {
    // console.log({ url });
    form.setValue("mainImage", url as string);
  };

  const onSubmit = async (values: z.infer<typeof updateBlogSchema>) => {
    const { tags, slug } = values;

    if (!slug) {
      values.slug = generateSlug(values.title);
    }

    createBlog({
      variables: {
        ...values,
        tags: tags.map((tag: TTag) => tag.key),
      },
      onCompleted: (data: CreateBlogMutation | unknown) => {
        // toast.success(JSON);
        // console.log({ data });
        toast.success(`${(data as CreateBlogMutation).createPost.title}`);
        form.reset();
      },
      onError: (error: any) => {
        console.error({ error });
        toast.error("Failed to create blog");
      },
      notifyOnNetworkStatusChange: true,
    });
  };

  // if (loading) return <p>Đang tải...</p>;
  // if (error) return <p>Lỗi: {error.message}</p>;

  const watchTitle = form.watch("title");
  const watchDescription = form.watch("description");
  const img = form.watch("mainImage");

  const onChangeContent = (value: Value) => {
    // console.log({ value });
    setContent(value);
    form.setValue("content", value);
  };

  const titleDebounced = useDebounce(watchTitle, 300);
  const descriptionDebounced = useDebounce(watchDescription, 300);

  useEffect(() => {
    if (typeof titleDebounced === "string") {
      form.setValue("slug", generateSlug(titleDebounced));
    }
  }, [titleDebounced]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto py-6 min-h-screen ">
      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        className="flex flex-col gap-4 col-span-2 h-fit"
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

          <Card className={cardStyle}>
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

          <div className="w-full">
            {!img ? (
              <UploadImage
                onUploadSuccess={handleMainImageUploadSuccess}
                className={`${cardStyle} w-full h-full object-cover max-w-lg mx-auto`}
                classNameIcon="size-16"
                classContainer={`w-full h-96 object-cover rounded-3xl mx-auto border-2 border-dashed border-primary/20 p-4 ${
                  form.formState.errors["mainImage"]?.message &&
                  "border-rose-500"
                }`}
                error={!!form.formState.errors["mainImage"]?.message}
              />
            ) : (
              <div className="w-full h-96 xl:h-auto aspect-video relative flex justify-center items-center rounded-3xl group overflow-hidden transition-all duration-300 ease-in-out">
                <Image
                  src={img}
                  alt="main-image-of-the-blog"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 80vw,
                     60vw"
                  className="object-cover rounded-2xl w-full h-full min-h-20"
                />

                <div className="absolute cursor-pointer opacity-0 group-hover:opacity-100 group-hover:bg-black/20 group-hover:inset-0 hidden group-hover:flex justify-center items-center w-full h-full rounded-2xl transition-all duration-300 ease-in-out ">
                  <Button
                    variant="outline"
                    className="flex flex-col gap-2"
                    type="button"
                    size="icon"
                    onClick={() => form.setValue("mainImage", "")}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {form.formState.errors["mainImage"]?.message && (
              <FormMessage className="mt-2">
                {form.formState.errors["mainImage"]?.message}
              </FormMessage>
            )}
          </div>

          <Card className={cardStyle}>
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

          <Card className={cardStyle}>
            <CardHeader>
              <CardTitle>Category</CardTitle>
              <CardDescription>
                Select the category of the blog post...
              </CardDescription>
            </CardHeader>

            <CardContent>
              <SelectControlled
                name="categoryId"
                label=""
                placeholder="Select the category of the blog post..."
                selectOptions={categoryOptions}
              />
            </CardContent>
          </Card>

          <div>
            <MultiSelectControlled name="tags" label="Tags" options={TAGS} />
          </div>

          <Card className={`${cardStyle}`}>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>
                Lets cook the content with plenty of tools and features...
              </CardDescription>
            </CardHeader>

            <CardContent>
              <PlateEditor value={content} onChange={onChangeContent} />
            </CardContent>
          </Card>
        </div>
      </FormWrapper>

      <PreviewControl
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        title={titleDebounced}
        description={descriptionDebounced}
      />
    </div>
  );
};
