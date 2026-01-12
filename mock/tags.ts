interface ITag {
  key: string;
  name: string;
  icon?: React.ReactNode;
}
export const TAGS: ITag[] = [
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
