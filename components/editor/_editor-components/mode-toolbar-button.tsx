"use client";

import * as React from "react";

import { SuggestionPlugin } from "@platejs/suggestion/react";
import {
  type DropdownMenuProps,
  DropdownMenuItemIndicator,
} from "@radix-ui/react-dropdown-menu";
import {
  CheckIcon,
  EyeIcon,
  PencilLineIcon,
  PenIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useEditorRef, usePlateState, usePluginOption } from "platejs/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorMode } from "@/hooks/zustand/use-editor-mode";

import { ToolbarButton } from "../control/toolbar";

export function ModeToolbarButton(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [readOnly, setReadOnly] = usePlateState("readOnly");
  const [open, setOpen] = React.useState(false);
  const { mode, setMode } = useEditorMode();

  const isSuggesting = usePluginOption(SuggestionPlugin, "isSuggesting");

  let value = mode;

  // Sync with editor state
  if (readOnly && mode === "editing") {
    value = "viewing";
  }
  if (isSuggesting) {
    value = "suggestion";
  }

  const item: Record<string, { icon: React.ReactNode; label: string }> = {
    editing: {
      icon: <PenIcon />,
      label: "Editing",
    },
    suggestion: {
      icon: <PencilLineIcon />,
      label: "Suggestion",
    },
    viewing: {
      icon: <ShieldCheckIcon />,
      label: "Viewing",
    },

    viewClient: {
      icon: <EyeIcon />,
      label: "Viewing Client",
    },
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip="Editing mode" isDropdown>
          {item[value].icon}
          <span className="hidden lg:inline">{item[value].label}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[180px]" align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => {
            // Update the mode in the hook
            setMode(newValue as any);

            // Handle viewing mode (admin view - read only with features)
            if (newValue === "viewing") {
              setReadOnly(true);
              editor.setOption(SuggestionPlugin, "isSuggesting", false);
              return;
            }

            // Handle client view mode (user view - read only, no features)
            if (newValue === "viewClient") {
              setReadOnly(true);
              editor.setOption(SuggestionPlugin, "isSuggesting", false);
              return;
            }

            // Handle suggestion mode
            if (newValue === "suggestion") {
              setReadOnly(false);
              editor.setOption(SuggestionPlugin, "isSuggesting", true);
              return;
            }

            // Handle editing mode (default)
            if (newValue === "editing") {
              setReadOnly(false);
              editor.setOption(SuggestionPlugin, "isSuggesting", false);
              editor.tf.focus();
              return;
            }
          }}
        >
          <DropdownMenuRadioItem
            className="pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground"
            value="editing"
          >
            <Indicator />
            {item.editing.icon}
            {item.editing.label}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className="pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground"
            value="viewing"
          >
            <Indicator />
            {item.viewing.icon}
            {item.viewing.label}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className="pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground"
            value="viewClient"
          >
            <Indicator />
            {item.viewClient.icon}
            {item.viewClient.label}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className="pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground"
            value="suggestion"
          >
            <Indicator />
            {item.suggestion.icon}
            {item.suggestion.label}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Indicator() {
  return (
    <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <CheckIcon />
      </DropdownMenuItemIndicator>
    </span>
  );
}
