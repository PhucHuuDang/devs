import { SelectOption } from "@/components/custom/form/fields/select-controlled";
import { CodeIcon, GlobeIcon, ServerIcon } from "lucide-react";

export const categoryOptions: SelectOption[] = [
  {
    label: "Technology",
    value: "cmhqj0jfs0000gnvlfw6uknbc",
    icon: <GlobeIcon />,
  },
  { label: "Web Development", value: "web-development", icon: <GlobeIcon /> },
  { label: "JavaScript", value: "javascript", icon: <CodeIcon /> },
  { label: "TypeScript", value: "typescript", icon: <CodeIcon /> },
  { label: "React", value: "react", icon: <CodeIcon /> },
  { label: "Next.js", value: "nextjs", icon: <CodeIcon /> },
  { label: "Node.js", value: "nodejs", icon: <ServerIcon /> },
];

// [
//   {
//     "id": "cmhqj0jfs0000gnvlfw6uknbc",
//     "name": "Technology",
//     "createdAt": "2025-11-08 16:56:07.425",
//     "updatedAt": "2025-11-08 16:56:07.425"
//   }
// ]
