import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Logo } from "./logo";

// We need to mock next/link since it requires Next.js context
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe("Logo", () => {
  it("renders the brand text DEVS", () => {
    render(<Logo />);
    expect(screen.getByText("DEVS")).toBeInTheDocument();
  });

  it("links to the home page", () => {
    render(<Logo />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies custom className to the link", () => {
    render(<Logo className="custom-class" />);
    const link = screen.getByRole("link");
    expect(link.className).toContain("custom-class");
  });

  it("applies custom classNameText to the text span", () => {
    render(<Logo classNameText="text-custom" />);
    const text = screen.getByText("DEVS");
    expect(text.className).toContain("text-custom");
  });

  it("renders the Code icon", () => {
    const { container } = render(<Logo />);
    // lucide-react renders an SVG element
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
