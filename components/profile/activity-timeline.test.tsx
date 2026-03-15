import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ActivityTimeline } from "./activity-timeline";

import type { Activity } from "./activity-timeline";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...rest
    }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className}>{children}</div>
    ),
  },
}));

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "post",
    title: "Published a new post",
    description: "Interesting article about testing",
    target: { id: "t1", title: "Testing Best Practices", type: "post" },
    createdAt: new Date("2024-06-15T10:00:00"),
  },
  {
    id: "2",
    type: "comment",
    title: "Commented on a post",
    description: "Great article!",
    target: { id: "t2", title: "React Patterns", type: "post" },
    createdAt: new Date("2024-06-14T08:00:00"),
  },
  {
    id: "3",
    type: "like",
    title: "Liked a post",
    target: { id: "t3", title: "TypeScript Tips", type: "post" },
    createdAt: new Date("2024-06-13T12:00:00"),
  },
];

describe("ActivityTimeline", () => {
  it("renders activities when provided via initialActivities", () => {
    render(<ActivityTimeline initialActivities={mockActivities} />);

    expect(screen.getByText("Published a new post")).toBeInTheDocument();
    expect(screen.getByText("Commented on a post")).toBeInTheDocument();
    expect(screen.getByText("Liked a post")).toBeInTheDocument();
  });

  it("renders activity descriptions", () => {
    render(<ActivityTimeline initialActivities={mockActivities} />);

    expect(
      screen.getByText("Interesting article about testing"),
    ).toBeInTheDocument();
    expect(screen.getByText("Great article!")).toBeInTheDocument();
  });

  it("renders activity target titles", () => {
    render(<ActivityTimeline initialActivities={mockActivities} />);

    expect(screen.getByText("Testing Best Practices")).toBeInTheDocument();
    expect(screen.getByText("React Patterns")).toBeInTheDocument();
    expect(screen.getByText("TypeScript Tips")).toBeInTheDocument();
  });

  it("shows empty state when no activities and initialActivities is empty", () => {
    render(<ActivityTimeline initialActivities={[]} />);

    expect(screen.getByText("No activities yet")).toBeInTheDocument();
    expect(
      screen.getByText("Your recent activities will appear here."),
    ).toBeInTheDocument();
  });

  it("renders relative time for each activity", () => {
    render(<ActivityTimeline initialActivities={mockActivities} />);

    // Each activity should have a time element
    const timeElements = screen.getAllByRole("time", { hidden: true });
    // Fall back to querying time elements directly
    const { container } = render(
      <ActivityTimeline initialActivities={mockActivities} />,
    );
    const times = container.querySelectorAll("time");
    expect(times.length).toBe(mockActivities.length);
  });
});
