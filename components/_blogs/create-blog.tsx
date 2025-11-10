"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { GET_POSTS } from "@/app/graphql/queries/post.queries";
import FormWrapper from "@/components/custom/form/form-wrapper";
import z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { InputControlled } from "@/components/custom/form/fields/input-controlled";
import { MultiSelectControlled } from "@/components/custom/form/fields/multi-select-controlled";
import { TTag } from "@/components/ui/multiple-select";

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
import { Button } from "@/components/ui/button";
import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CodeIcon,
  CopyIcon,
  GlobeIcon,
  NotepadTextDashedIcon,
  RocketIcon,
  ServerIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react";
import { SimpleLoading } from "@/components/_loading/simple-loading";
import dynamic from "next/dynamic";
import { Value } from "platejs";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlogCard } from "@/components/_blogs/blog-card";
import {
  SelectControlled,
  SelectOption,
} from "@/components/custom/form/fields/select-controlled";
import { FormMessage } from "@/components/ui/form";
import { TAGS } from "@/app/mock/tags";
import { categoryOptions } from "@/app/mock/category";
import { CREATE_BLOG } from "@/app/graphql/mutaions/post.mutations";
import { toast } from "sonner";
import {
  CreateBlogMutation,
  CreateBlogMutationResult,
} from "@/app/graphql/__generated__/graphql";
import { useDebounce } from "@/hooks/use-debounce";

const PlateEditor = dynamic(
  () =>
    import("@/components/editor/plate-editor").then((mod) => mod.PlateEditor),
  {
    ssr: false,
    loading() {
      return <SimpleLoading />;
    },
  }
);

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
];

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

const cardStyle = `hover:border-primary/20 rounded-3xl  transition-all duration-300`;

export const CreateBlog = () => {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      mainImage: "",
      tags: [TAGS[0]! as TTag],
      categoryId: categoryOptions[0]!.value,
      authorId: "cmhqi5ks60000gn5l82a3q268",
      isPublished: false,
      // isFeatured: false,
    },
    // mode: "onChange",
    // reValidateMode: "onChange",
  });

  // console.log(form.formState.errors);

  const handleMainImageUploadSuccess = (url: string | string[]) => {
    // console.log({ url });
    form.setValue("mainImage", url as string);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { tags, slug } = values;

    if (!slug) {
      values.slug = generateSlug(values.title);
    }

    createBlog({
      variables: {
        ...values,
        tags: tags.map((tag: TTag) => tag.key),
      },
      onCompleted: (data: CreateBlogMutationResult) => {
        // toast.success(JSON);
        console.log({ data });
        toast.success(`${data.createPost.title}`);
      },
      onError: (error: any) => {
        // toast.error(error.message);
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
    console.log({ value });
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

          <div className="w-full">
            {!img ? (
              <UploadImage
                onUploadSuccess={handleMainImageUploadSuccess}
                className="w-full h-full object-cover rounded-2xl max-w-lg mx-auto"
                classNameIcon="size-16"
                classContainer={`w-full h-96 object-cover rounded-2xl mx-auto border-2 border-dashed border-primary/20 p-4 ${
                  form.formState.errors["mainImage"]?.message &&
                  "border-rose-500"
                }`}
              />
            ) : (
              <div className="w-full h-96 xl:h-auto aspect-video relative flex justify-center items-center rounded-2xl group overflow-hidden  transition-all duration-300 ease-in-out">
                {/* <Image
                  src={img}
                  alt="main-image-of-the-blog"
                  layout="fill"
                  sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 80vw,
                60vw"
                  className="size-full min-h-20 object-cover rounded-2xl w-full "
                  loading="lazy"
                /> */}

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

          <Card className={cardStyle}>
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

      <div className="col-span-1 relative border rounded-2xl p-4">
        <div className="sticky top-28 w-full">
          <ButtonGroup className="grid grid-cols-3 w-full mb-4">
            <Button variant="outline" size="icon" className="w-full">
              <NotepadTextDashedIcon className="size-6 text-primary" />
              <span>Draft</span>
            </Button>

            <Button
              variant="outline"
              type="submit"
              size="icon"
              className="w-full col-span-1"
              onClick={form.handleSubmit(onSubmit)}
            >
              <RocketIcon className="size-6 text-primary" />
              <span>Publish</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="[--radius:1rem]">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <VolumeOffIcon />
                    Mute Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckIcon />
                    Mark as Read
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertTriangleIcon />
                    Report Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserRoundXIcon />
                    Block User
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShareIcon />
                    Share Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CopyIcon />
                    Copy Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <TrashIcon />
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>

          <div className="my-2 p-1 pl-4 bg-slate-100 rounded-xl">
            <span className="text-sm text-slate-800 font-medium">
              https://devs.com/blogs/{form.watch("slug")}
            </span>
          </div>

          <BlogCard
            title={titleDebounced || "Lets make impressive title!"}
            description={
              descriptionDebounced ||
              `Lets make the description interesting and catchy - This will be the
        first thing people see when they land on your blog post`
            }
            mainImage={form.watch("mainImage") || "/image.jpg"}
            views={100}
            tags={
              form.watch("tags")?.map((tag: TTag) => tag.name) || [
                "Web Development",
                "JavaScript",
                "React",
              ]
            }
            createdAt={new Date()}
            updatedAt={new Date()}
            author={[
              {
                id: "1",
                name: "John Doe",
                designation: "Software Engineer",
                image: "/image.jpg",
              },
            ]}
            isBorderDefault
          />
        </div>
      </div>
    </div>
  );
};
