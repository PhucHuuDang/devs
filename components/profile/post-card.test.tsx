import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { createFakePost } from "@/src/test/factories/post";

import { PostCard, PostCardGrid, PostCardSkeleton } from "./post-card";

import type { PostCardData } from "./post-card";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...rest
    }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

describe("PostCard", () => {
  const defaultPost: PostCardData = {
    id: "post-1",
    title: "My First Blog Post",
    slug: "my-first-blog-post",
    description: "This is a description of the post",
    mainImage: "https://example.com/image.jpg",
    status: "published",
    views: 1234,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-06-15"),
    category: { id: "cat-1", name: "Technology" },
  };

  it("renders the post title", () => {
    render(<PostCard post={defaultPost} />);
    expect(screen.getByText("My First Blog Post")).toBeInTheDocument();
  });

  it("renders the status badge", () => {
    render(<PostCard post={defaultPost} />);
    expect(screen.getByText("Published")).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(<PostCard post={defaultPost} />);
    expect(
      screen.getByText("This is a description of the post"),
    ).toBeInTheDocument();
  });

  it("renders the category name when provided", () => {
    render(<PostCard post={defaultPost} />);
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("renders the view count", () => {
    render(<PostCard post={defaultPost} />);
    expect(screen.getByText("1,234")).toBeInTheDocument();
  });

  it("renders an image when mainImage is provided", () => {
    render(<PostCard post={defaultPost} />);
    const img = screen.getByAltText("My First Blog Post");
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("renders fallback emoji when no mainImage", () => {
    const postWithoutImage = { ...defaultPost, mainImage: undefined };
    render(<PostCard post={postWithoutImage} />);
    expect(screen.getByText("📝")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const postWithoutDesc = { ...defaultPost, description: undefined };
    render(<PostCard post={postWithoutDesc} />);
    expect(
      screen.queryByText("This is a description of the post"),
    ).not.toBeInTheDocument();
  });

  it("renders correct status config for all statuses", () => {
    const statuses: PostCardData["status"][] = [
      "draft",
      "pending",
      "published",
      "rejected",
    ];
    const labels = ["Draft", "Pending", "Published", "Rejected"];

    statuses.forEach((status, index) => {
      const { unmount } = render(
        <PostCard post={{ ...defaultPost, status }} />,
      );
      expect(screen.getByText(labels[index])).toBeInTheDocument();
      unmount();
    });
  });

  it("calls onView when view button is clicked", async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    render(<PostCard post={defaultPost} onView={onView} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);
    expect(onView).toHaveBeenCalledWith(defaultPost);
  });

  it("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(<PostCard post={defaultPost} onEdit={onEdit} />);

    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(defaultPost);
  });
});

describe("PostCardGrid", () => {
  it("renders multiple cards", () => {
    const posts = [
      createFakePost({ id: "1", title: "Post One" }),
      createFakePost({ id: "2", title: "Post Two" }),
      createFakePost({ id: "3", title: "Post Three" }),
    ];

    render(<PostCardGrid posts={posts} />);

    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
    expect(screen.getByText("Post Three")).toBeInTheDocument();
  });

  it("shows loading skeletons when isLoading is true", () => {
    const { container } = render(<PostCardGrid posts={[]} isLoading={true} />);
    // Skeleton renders 6 items
    const skeletons = container.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("shows empty message when no posts", () => {
    render(<PostCardGrid posts={[]} />);
    expect(screen.getByText("No posts yet")).toBeInTheDocument();
    expect(
      screen.getByText("Start writing to see your posts here."),
    ).toBeInTheDocument();
  });

  it("shows custom empty message", () => {
    render(<PostCardGrid posts={[]} emptyMessage="Nothing to show" />);
    expect(screen.getByText("Nothing to show")).toBeInTheDocument();
  });
});

describe("PostCardSkeleton", () => {
  it("renders skeleton elements", () => {
    const { container } = render(<PostCardSkeleton />);
    const skeletons = container.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
